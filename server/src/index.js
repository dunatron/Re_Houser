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
const logger = require("./middleware/loggers/logger");

process.on("uncaughtException", function(error) {
  console.log("error FUCK YES"); // doesn't log this,
});

process.on("referenceError", function(error) {
  console.log("error FUCK YES"); // doesn't log this,
});

// sets up pasrsing the body of the request
stripeMiddleWare(server);

const expressLogger = function(req, res, next) {
  // logger.info("test");
  if (req.url.startsWith("/graphql")) {
    logger.info("Gql fired");
  }
  next();
};

server.use(expressLogger);
server.express.use(cookieParser());
userMiddleware(server);

// I dont know if this works. its like an express thing getting err?
server.express.use(function(err, req, res, next) {
  logger.error("error: ");
  next(err);
});

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
      keepAlive: true, // blindly added this
    },
  },
  (details) => {
    logger.info("Server is now running tetsing from local", {
      port: details.port,
    });
  }
);

module.exports = app;
