const express = require("express");
const {
  createListing,
  getListings,
  getListing,
  updateListing,
  deleteListing
} = require("../controllers/listing.controller");
const authenticate = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/", authenticate, createListing);
router.get("/", getListings);
router.get("/:id", getListing);
router.put("/:id", authenticate, updateListing);
router.delete("/:id", authenticate, deleteListing);

module.exports = router;
