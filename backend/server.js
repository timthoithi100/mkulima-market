const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const { PrismaClient } = require("@prisma/client");
const app = require("./app");
const registerSockets = require("./src/sockets");

const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] }
});

// attach io to requests so controllers can emit
app.use((req, res, next) => {
  req.io = io;
  next();
});

// register all sockets
registerSockets(io);

server.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
