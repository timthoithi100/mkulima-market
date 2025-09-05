function chatSocket(io) {
  io.on("connection", (socket) => {
    console.log("Chat socket connected:", socket.id);

    socket.on("join", (userId) => {
      socket.join(userId);
      console.log(`User ${userId} joined their chat room`);
    });

    socket.on("disconnect", () => {
      console.log("Chat socket disconnected:", socket.id);
    });
  });
}

module.exports = chatSocket;
