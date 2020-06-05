const rentalApplicationsConnection = require("./connections/rentalApplicationsConnection");
const chatsConnection = require("./connections/chatsConnection");
const messagesConnection = require("./connections/messagesConnection");
const paymentsConnection = require("./connections/paymentsConnection");

const Connection = {
  rentalApplicationsConnection,
  chatsConnection,
  messagesConnection,
  paymentsConnection
};

module.exports = Connection;
