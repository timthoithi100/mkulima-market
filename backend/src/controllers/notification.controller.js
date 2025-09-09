const prisma = require("../../config/database");

async function createNotification(userId, message, type, io) {
  const notification = await prisma.notification.create({
    data: { userId, message, type }
  });

  io.to(userId).emit("notification", notification);

  return notification;
}

async function getNotifications(req, res) {
  try {
    const notifications = await prisma.notification.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: "desc" }
    });
    return res.json(notifications);
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}

async function markAsRead(req, res) {
  try {
    const { id } = req.params;
    const notification = await prisma.notification.update({
      where: { id },
      data: { isRead: true }
    });
    return res.json(notification);
  } catch (err) {
    return res.status(500).json({ message: "Update failed", error: err.message });
  }
}

async function broadcastNotification(req, res) {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const { message, type } = req.body;
    if (!message || !type) {
      return res.status(400).json({ message: "Message and type are required" });
    }

    const users = await prisma.user.findMany({ select: { id: true } });

    const notifications = await prisma.$transaction(
      users.map(u =>
        prisma.notification.create({
          data: { userId: u.id, message, type }
        })
      )
    );

    users.forEach(u => {
      req.io.to(u.id).emit("notification", {
        message,
        type,
        createdAt: new Date()
      });
    });

    return res.json({ message: "Broadcast sent", notifications });
  } catch (err) {
    return res.status(500).json({ message: "Broadcast failed", error: err.message });
  }
}

module.exports = {
  createNotification,
  getNotifications,
  markAsRead,
  broadcastNotification
};

// How It Works

// Regular users → can only view and mark their own notifications.

// Admin users → can hit /api/notifications/broadcast with a JSON body like:

// curl -X POST http://localhost:5000/api/notifications/broadcast \
//   -H "Authorization: Bearer <ADMIN_TOKEN>" \
//   -H "Content-Type: application/json" \
//   -d '{"message":"Scheduled maintenance at 10 PM", "type":"system"}'


// All users get the notification stored in DB and pushed in real time via sockets.