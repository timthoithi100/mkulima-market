const chatSocket = require("./chat.socket");
const notificationSocket = require("./notification.socket");
const marketSocket = require("./market.socket");

function registerSockets(io) {
  chatSocket(io);
  notificationSocket(io);
  marketSocket(io);
}

module.exports = registerSockets;
