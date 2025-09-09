const prisma = require("../../config/database");
const { createNotification } = require("./notification.controller");

async function sendMessage(req, res) {
  try {
    const { receiverId, content } = req.body;

    if (!receiverId || !content) {
      return res.status(400).json({ message: "Receiver and content are required." });
    }

    const message = await prisma.message.create({
      data: {
        content,
        senderId: req.user.id,
        receiverId
      },
      include: {
        sender: { select: { id: true, firstName: true, lastName: true } },
        receiver: { select: { id: true, firstName: true, lastName: true } }
      }
    });

    req.io.to(receiverId).emit("new_message", message);

    await createNotification(receiverId, "You have a new message", "message", req.io);

    return res.status(201).json(message);
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}

async function getMessages(req, res) {
  try {
    const { userId } = req.params;

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: req.user.id, receiverId: userId },
          { senderId: userId, receiverId: req.user.id }
        ]
      },
      orderBy: { createdAt: "asc" },
      include: {
        sender: { select: { id: true, firstName: true, lastName: true } },
        receiver: { select: { id: true, firstName: true, lastName: true } }
      }
    });

    return res.json(messages);
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}

module.exports = {
  sendMessage,
  getMessages
};
