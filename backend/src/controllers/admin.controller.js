const prisma = require("../../config/database");

async function getAllUsers(req, res) {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Forbidden" });

    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      include: { listings: true, transactions: true }
    });
    return res.json(users);
  } catch (err) {
    return res.status(500).json({ message: "Error fetching users", error: err.message });
  }
}

async function toggleUserStatus(req, res) {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Forbidden" });

    const { id } = req.params;
    const user = await prisma.user.update({
      where: { id },
      data: { isActive: { set: false } }
    });
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ message: "Error updating user", error: err.message });
  }
}

async function getAllListings(req, res) {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Forbidden" });

    const listings = await prisma.listing.findMany({
      orderBy: { createdAt: "desc" },
      include: { animal: true, seller: true }
    });
    return res.json(listings);
  } catch (err) {
    return res.status(500).json({ message: "Error fetching listings", error: err.message });
  }
}

async function getAllTransactions(req, res) {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Forbidden" });

    const transactions = await prisma.transaction.findMany({
      orderBy: { createdAt: "desc" },
      include: { user: true }
    });
    return res.json(transactions);
  } catch (err) {
    return res.status(500).json({ message: "Error fetching transactions", error: err.message });
  }
}

async function getAnalytics(req, res) {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Forbidden" });

    const totalUsers = await prisma.user.count();
    const totalListings = await prisma.listing.count();
    const totalTransactions = await prisma.transaction.count();
    const totalRevenue = await prisma.transaction.aggregate({
      _sum: { amount: true }
    });

    const topFarmers = await prisma.user.findMany({
      where: { role: "farmer" },
      include: { listings: true },
      take: 5
    });

    return res.json({
      totalUsers,
      totalListings,
      totalTransactions,
      totalRevenue: totalRevenue._sum.amount || 0,
      topFarmers
    });
  } catch (err) {
    return res.status(500).json({ message: "Error fetching analytics", error: err.message });
  }
}

module.exports = {
  getAllUsers,
  toggleUserStatus,
  getAllListings,
  getAllTransactions,
  getAnalytics
};
