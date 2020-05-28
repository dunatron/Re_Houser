const rentalApplicationsConnection = require("./connections/rentalApplicationsConnection");
const chatsConnection = require("./connections/chatsConnection");
const messagesConnection = require("./connections/messagesConnection");

const Connection = {
  rentalApplicationsConnection,
  chatsConnection,
  messagesConnection
};

module.exports = Connection;
