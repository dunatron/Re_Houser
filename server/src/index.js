// require("dotenv").config({ path: "./variables-prod.env" })
require("dotenv").config({ path: "./variables.env" });
// require("dotenv").config()
// All about how to deal with chromes new cookie laws https://blog.heroku.com/chrome-changes-samesite-cookie
const cookieParser = require("cookie-parser");
const createServer = require("./createServer");
const initialiseTasks = require("./lib/tasks/index");
const server = createServer();
const stripeMiddleWare = require("./middleware/stripe/index");
const userMiddleware = require("./middleware/user/index");
const routes = require("./routes/index");
// const logger = require("./middleware/loggers/logger");

// process.on("uncaughtException", err => {
//   console.log(`Uncaught Exception: ${err.message}`);
//   return err;
// });

// process.on("unhandledRejection", (reason, promise) => {
//   console.log(
//     "Custom Unhandled rejection at ",
//     promise,
//     `reason: ${reason.message}`
//   );
//   return reason;
//   // throw reason;
//   // return reason;
//   // return reason; // return the errors to try not crash express
// });

// server.express.use(function(err, req, res, next) {
//   console.error(err.stack);
//   res.status(500).send("Something broke!");
// });

// sets up pasrsing the body of the request
stripeMiddleWare(server);

const expressLogger = function(req, res, next) {
  var ip =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null);
  var ipAddr = req.headers["x-forwarded-for"];
  if (ipAddr) {
    var list = ipAddr.split(",");
    ipAddr = list[list.length - 1];
  } else {
    ipAddr = req.connection.remoteAddress;
  }
  // logger.log("info", `request to express server ${req.body.operationName}`, {
  //   ip: ip,
  //   ipAddr: ipAddr,
  //   url: req.url,
  //   user: {
  //     id: req.userId,
  //     permissions: req.userPermissions,
  //   },
  //   method: req.method,
  //   operationName: req.body.operationName,
  //   variables: req.body.variables,
  //   origin: req.headers.origin,
  //   userAgent: req.headers["user-agent"],
  //   query: req.body.query,
  // });

  next();
};

server.use(expressLogger);
server.express.use(cookieParser());

userMiddleware(server);

routes(server);

// setup cron jobs
initialiseTasks();

const allowedClientOrigins = [
  "http://localhost:7777",
  "https://rehouser-next-prod.herokuapp.com",
  "http://app.rehouser.co.nz",
  "http://rehouser.co.nz",
  "https://app.rehouser.co.nz",
  "https://rehouser.co.nz",
  "https://yoga.rehouser.co.nz",
  "http://app.uat.rehouser.co.nz",
  process.env.FRONTEND_URL,
];

// Start gql yoga/express server
const app = server.start(
  {
    cors: {
      credentials: true,
      origin: allowedClientOrigins,
    },
    port: process.env.PORT || 4444,
    // playground: ??
    subscriptions: {
      keepAlive: true, // blindly added this. keep subs alive...
    },
  },
  (details) => {
    // logger.info("gql yoga/express server is up", {
    //   ...details,
    //   port: details.port
    // });
  }
);

module.exports = app;
