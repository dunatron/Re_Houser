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

// sets up pasrsing the body of the request
stripeMiddleWare(server);

const expressLogger = function(req, res, next) {
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
