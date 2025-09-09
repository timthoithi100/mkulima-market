const express = require("express");
const {
  getNotifications,
  markAsRead,
  broadcastNotification
} = require("../controllers/notification.controller");
const authenticate = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", authenticate, getNotifications);
router.put("/:id/read", authenticate, markAsRead);
router.post("/broadcast", authenticate, broadcastNotification);

module.exports = router;
