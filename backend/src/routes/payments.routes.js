const express = require("express");
const { initiatePayment, mpesaCallback } = require("../controllers/payment.controller");
const authenticate = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/initiate", authenticate, initiatePayment);
router.post("/callback", mpesaCallback);

module.exports = router;
