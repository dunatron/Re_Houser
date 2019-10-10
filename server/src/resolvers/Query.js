const { forwardTo } = require("prisma-binding");
const { hasPermission } = require("../lib/utils");
// Business logic Querys
const me = require("./querys/me");
const users = require("./querys/users");
const file = require("./querys/file");
const files = require("./querys/files");
const myLeases = require("./querys/myLeases.js");
const myLease = require("./querys/myLease.js");
const payments = require("./querys/payments");
const rentalApplication = require("./querys/rentalApplication");
const rentalApplications = require("./querys/rentalApplications");
const myRentalApplications = require("./querys/myRentalApplications");
const myCreditCards = require("./querys/myCreditCards");
const findUsers = require("./querys/findUser");
const properties = require("./querys/properties");
const ownerProperty = require("./querys/ownerProperty");
const ownerProperties = require("./querys/ownerProperties");
const chats = require("./querys/chats");
const chatsConnection = require("./querys/chatsConnection");
const chat = require("./querys/chat");
const messages = require("./querys/messages");
const messagesConnection = require("./querys/messagesConnection");

const Query = {
  me,
  users,
  file,
  files,
  properties,
  ownerProperty,
  ownerProperties,
  rentalApplications,
  myRentalApplications,
  myCreditCards,
  myLeases,
  myLease,
  rentalApplication,
  payments,
  findUsers,
  chats,
  chatsConnection,
  chat,
  messages,
  messagesConnection
};

module.exports = Query;
