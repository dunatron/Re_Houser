const rentalApplicationsConnection = require("./connections/rentalApplicationsConnection");
const chatsConnection = require("./connections/chatsConnection");
const messagesConnection = require("./connections/messagesConnection");
const paymentsConnection = require("./connections/paymentsConnection");
const chargesConnection = require("./connections/chargesConnection");
const rentalAppraisalsConnection = require("./connections/rentalAppraisalsConnection");

const Connection = {
  rentalApplicationsConnection,
  chatsConnection,
  messagesConnection,
  paymentsConnection,
  chargesConnection,
  rentalAppraisalsConnection
};

module.exports = Connection;
