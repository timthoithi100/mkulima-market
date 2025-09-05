const prisma = require("../../config/database");

async function createListing(req, res) {
  try {
    const { price, location, animalId } = req.body;

    if (!price || !location || !animalId) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const listing = await prisma.listing.create({
      data: {
        price,
        location,
        userId: req.user.id,
        animalId
      },
      include: { animal: true, user: { select: { id: true, firstName: true, lastName: true } } }
    });

    return res.status(201).json(listing);
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}

async function getListings(req, res) {
  try {
    const listings = await prisma.listing.findMany({
      include: {
        animal: true,
        user: { select: { id: true, firstName: true, lastName: true, phone: true } }
      }
    });

    return res.json(listings);
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}

async function getListing(req, res) {
  try {
    const { id } = req.params;
    const listing = await prisma.listing.findUnique({
      where: { id },
      include: {
        animal: true,
        user: { select: { id: true, firstName: true, lastName: true, phone: true } }
      }
    });

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    return res.json(listing);
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}

async function updateListing(req, res) {
  try {
    const { id } = req.params;
    const { price, location, status, featured } = req.body;

    const listing = await prisma.listing.findUnique({ where: { id } });
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    if (listing.userId !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this listing" });
    }

    const updated = await prisma.listing.update({
      where: { id },
      data: { price, location, status, featured }
    });

    return res.json(updated);
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}

async function deleteListing(req, res) {
  try {
    const { id } = req.params;

    const listing = await prisma.listing.findUnique({ where: { id } });
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    if (listing.userId !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this listing" });
    }

    await prisma.listing.delete({ where: { id } });

    return res.json({ message: "Listing deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}

module.exports = {
  createListing,
  getListings,
  getListing,
  updateListing,
  deleteListing
};
