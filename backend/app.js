const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Example route placeholder
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Mkulima Market API" });
});

module.exports = app;
