function notificationSocket(io) {
  io.on("connection", (socket) => {
    console.log("Notification socket connected:", socket.id);

    socket.on("join", (userId) => {
      socket.join(userId);
      console.log(`User ${userId} joined notifications`);
    });

    socket.on("disconnect", () => {
      console.log("Notification socket disconnected:", socket.id);
    });
  });
}

module.exports = notificationSocket;
