const express = require("express");
const { sendMessage, getMessages } = require("../controllers/message.controller");
const authenticate = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/", authenticate, sendMessage);
router.get("/:userId", authenticate, getMessages);

module.exports = router;
