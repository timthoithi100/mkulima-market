const express = require("express");
const { createAnimal, getAnimals } = require("../controllers/animal.controller");
const authenticate = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/", authenticate, createAnimal);
router.get("/", getAnimals);

module.exports = router;
