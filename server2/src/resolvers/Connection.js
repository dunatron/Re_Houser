const rentalApplicationsConnection = require("./connections/rentalApplicationsConnection");
const chatsConnection = require("./connections/chatsConnection");
const messagesConnection = require("./connections/messagesConnection");
const paymentsConnection = require("./connections/paymentsConnection");
const chargesConnection = require("./connections/chargesConnection");
const rentalAppraisalsConnection = require("./connections/rentalAppraisalsConnection");
const propertiesConnection = require("./connections/propertiesConnection");
const inspectionsConnection = require("./connections/inspectionsConnection");

const Connection = {
  rentalApplicationsConnection,
  chatsConnection,
  messagesConnection,
  paymentsConnection,
  chargesConnection,
  rentalAppraisalsConnection,
  propertiesConnection,
  inspectionsConnection
};

module.exports = Connection;
