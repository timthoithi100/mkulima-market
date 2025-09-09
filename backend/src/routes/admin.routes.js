const express = require("express");
const {
  getAllUsers,
  toggleUserStatus,
  getAllListings,
  getAllTransactions,
  getAnalytics
} = require("../controllers/admin.controller");
const authenticate = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/users", authenticate, getAllUsers);
router.put("/users/:id/toggle", authenticate, toggleUserStatus);

router.get("/listings", authenticate, getAllListings);
router.get("/transactions", authenticate, getAllTransactions);

router.get("/analytics", authenticate, getAnalytics);

module.exports = router;
