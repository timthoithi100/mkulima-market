const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

const authRoutes = require("./src/routes/auth.routes");
const animalRoutes = require("./src/routes/animals.routes");
const listingRoutes = require("./src/routes/listings.routes");
const messageRoutes = require("./src/routes/messages.routes");
const paymentRoutes = require("./src/routes/payments.routes");
const transactionRoutes = require("./src/routes/transactions.routes");
const verificationRoutes = require("./src/routes/verification.routes");
const notificationRoutes = require("./src/routes/notifications.routes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/animals", animalRoutes);
app.use("/api/listings", listingRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/verification", verificationRoutes);
app.use("/api/notifications", notificationRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Mkulima Market API" });
});

module.exports = app;
