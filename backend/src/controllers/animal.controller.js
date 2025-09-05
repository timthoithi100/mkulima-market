const prisma = require("../../config/database");

async function createAnimal(req, res) {
  try {
    const { type, breed, ageMonths, weightKg, gender, purpose } = req.body;

    if (!type || !breed || !ageMonths || !weightKg || !gender || !purpose) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const animal = await prisma.animal.create({
      data: { type, breed, ageMonths, weightKg, gender, purpose }
    });

    return res.status(201).json(animal);
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}

async function getAnimals(req, res) {
  try {
    const animals = await prisma.animal.findMany();
    return res.json(animals);
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}

module.exports = {
  createAnimal,
  getAnimals
};
