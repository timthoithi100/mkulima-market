const prisma = require("../../config/database");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

async function requestEmailVerification(req, res) {
  try {
    const token = crypto.randomBytes(20).toString("hex");

    await prisma.verificationToken.create({
      data: {
        userId: req.user.id,
        token,
        type: "email"
      }
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: req.user.email,
      subject: "Verify your email",
      text: `Click this link to verify your email: ${process.env.FRONTEND_URL}/verify-email?token=${token}`
    });

    return res.json({ message: "Verification email sent." });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}

async function verifyEmail(req, res) {
  try {
    const { token } = req.body;
    const record = await prisma.verificationToken.findUnique({ where: { token } });

    if (!record) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    await prisma.user.update({
      where: { id: record.userId },
      data: { isEmailVerified: true }
    });

    await prisma.verificationToken.delete({ where: { token } });

    return res.json({ message: "Email verified successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Verification failed", error: err.message });
  }
}

module.exports = { requestEmailVerification, verifyEmail };
