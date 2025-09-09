const { initiateSTKPush } = require("../services/payment.service");
const prisma = require("../../config/database");
const { createNotification } = require("./notification.controller");

async function initiatePayment(req, res) {
  try {
    const { phone, amount, listingId } = req.body;

    if (!phone || !amount || !listingId) {
      return res.status(400).json({ message: "Phone, amount and listingId are required" });
    }

    const response = await initiateSTKPush(phone, amount, listingId, "Livestock purchase");

    const transaction = await prisma.transaction.create({
      data: {
        amount,
        status: "pending",
        userId: req.user.id
      }
    });

    return res.status(201).json({ mpesa: response, transaction });
  } catch (err) {
    return res.status(500).json({ message: "Payment initiation failed", error: err.message });
  }
}

async function mpesaCallback(req, res) {
  try {
    const { Body } = req.body;

    if (Body.stkCallback.ResultCode === 0) {
      const receipt = Body.stkCallback.CallbackMetadata.Item.find(i => i.Name === "MpesaReceiptNumber");

      const updated = await prisma.transaction.updateMany({
        where: { status: "pending" },
        data: { status: "completed" }
      });

      if (updated.count > 0) {
        const tx = await prisma.transaction.findFirst({
          where: { status: "completed" },
          orderBy: { createdAt: "desc" }
        });
        await createNotification(tx.userId, "Your payment was successful", "payment", req.io);
      }

      return res.json({ message: "Payment successful", receipt: receipt.Value });
    } else {
      const updated = await prisma.transaction.updateMany({
        where: { status: "pending" },
        data: { status: "failed" }
      });

      if (updated.count > 0) {
        const tx = await prisma.transaction.findFirst({
          where: { status: "failed" },
          orderBy: { createdAt: "desc" }
        });
        await createNotification(tx.userId, "Your payment failed", "payment", req.io);
      }

      return res.json({ message: "Payment failed" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Callback handling error", error: err.message });
  }
}

module.exports = { initiatePayment, mpesaCallback };
