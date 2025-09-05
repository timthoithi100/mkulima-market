const prisma = require("../../config/database");
const { generateToken, hashPassword, comparePassword } = require("../utils/helpers");
const { validateEmail, validatePassword, validatePhone } = require("../utils/validators");

async function register(req, res) {
  try {
    const { firstName, lastName, phone, email, password } = req.body;

    if (!firstName || !lastName || !phone || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    if (!validatePhone(phone)) {
      return res.status(400).json({ message: "Invalid phone format." });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({ message: "Password must be at least 6 characters." });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered." });
    }

    const hashed = await hashPassword(password);

    const user = await prisma.user.create({
      data: { firstName, lastName, phone, email, password: hashed }
    });

    const token = generateToken(user);

    return res.status(201).json({ token, user });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const token = generateToken(user);

    return res.json({ token, user });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}

async function profile(req, res) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, firstName: true, lastName: true, phone: true, email: true, role: true }
    });

    return res.json(user);
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}

module.exports = {
  register,
  login,
  profile
};
