const { forwardTo } = require("prisma-binding");
const { hasPermission } = require("../lib/utils");
// Business logic Querys
const crashMe = require("./querys/crashMe");
const asyncCrashMe = require("./querys/asyncCrashMe");
const me = require("./querys/me");
const users = require("./querys/users");
const user = require("./querys/user");
const file = require("./querys/file");
const files = require("./querys/files");
const myLeases = require("./querys/myLeases.js");
const myLease = require("./querys/myLease.js");
const payments = require("./querys/payments");
const payment = require("./querys/payment");
const rentalApplication = require("./querys/rentalApplication");
const rentalApplications = require("./querys/rentalApplications");
const myRentalApplications = require("./querys/myRentalApplications");
const myCreditCards = require("./querys/myCreditCards");
const findUsers = require("./querys/findUser");
const properties = require("./querys/properties");
const property = require("./querys/property");
const ownerProperty = require("./querys/ownerProperty");
const ownerProperties = require("./querys/ownerProperties");
const chats = require("./querys/chats");
const chat = require("./querys/chat");
const messages = require("./querys/messages");
const activities = require("./querys/activities");
const activity = require("./querys/activity");
const insulationForm = require("./querys/insulationForm");
const rentalAppraisals = require("./querys/rentalAppraisals");
const rentalAppraisal = require("./querys/rentalAppraisal");
const viewings = require("./querys/viewings");
const inspection = require("./querys/inspection");
const propertyFiles = require("./querys/propertyFiles");

const Query = {
  crashMe,
  asyncCrashMe,
  me,
  users,
  user,
  file,
  files,
  properties,
  property,
  ownerProperty,
  ownerProperties,
  propertyFiles,
  rentalApplications,
  myRentalApplications,
  myCreditCards,
  myLeases,
  myLease,
  rentalApplication,
  payments,
  payment,
  findUsers,
  chats,
  chat,
  messages,
  activities,
  activity,
  insulationForm,
  rentalAppraisals,
  rentalAppraisal,
  viewings,
  inspection
};

module.exports = Query;
