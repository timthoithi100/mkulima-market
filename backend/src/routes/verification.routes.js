const express = require("express");
const { requestEmailVerification, verifyEmail } = require("../controllers/verification.controller");
const authenticate = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/email/request", authenticate, requestEmailVerification);
router.post("/email/verify", authenticate, verifyEmail);

module.exports = router;
