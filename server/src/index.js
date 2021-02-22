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
const expressLoggingMiddleWare = require("./middleware/loggers/expressLogger");

var cors = require("cors");

const clientOrigins = [
  "http://localhost:7777",
  "https://localhost:7777",
  "https://rehouser-next-prod.herokuapp.com",
  "http://app.rehouser.co.nz",
  "https://app.rehouser.co.nz",
  "http://rehouser.co.nz",
  "https://rehouser.co.nz",
  "http://app.uat.rehouser.co.nz",
  "https://app.uat.rehouser.co.nz"
];

server.express.use(
  cors({
    credentials: true,
    // // origin: "*",
    origin: clientOrigins,
    // methods: "GET,PUT,POST,DELETE",
    methods: "*"
    // allowedHeaders: ["Content-Type", "Authorization"],
    // preflightContinue: true
  })
);

// could be quite useful
// https://developers.cloudflare.com/workers/examples/modify-request-property
// perhaps this too
// https://stackabuse.com/handling-cors-with-node-js/
// cors
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers
// https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

process.on("uncaughtException", err => {
  logger.log("error", `Uncaught Exception: ${err.message}`, {
    message: err.message
  });
  return err;
});

process.on("unhandledRejection", (reason, promise) => {
  logger.log("error", `unhandledRejection`, {
    reason: reason
  });
  return reason; // return the errors to try not crash express
});

server.express.use(cookieParser());
// server.use(expressLogger);
// sets up pasrsing the body of the request
stripeMiddleWare(server);
userMiddleware(server);
expressLoggingMiddleWare(server);

routes(server);

// setup cron jobs
initialiseTasks();

// Start gql yoga/express server
const app = server.start(
  {
    port: process.env.PORT || 4444,
    cors: {
      credentials: true,
      origin: clientOrigins
      // methods: ["GET", "PUT", "POST"]
    },
    debug: true,
    // playground: "/playground",
    // https://github.com/apollographql/subscriptions-transport-ws/issues/450
    subscriptions: {
      // path: "/subscriptions",
      path: "/",
      // onConnect: (connectionParams, webSocket, context) => {
      //   const { isLegacy, socket, request } = context;
      //   webSocket.on("error", (error) => {
      //     logger.log("error", `potential ws err onConnect`, {
      //       error: error,
      //     });
      //   });
      //   logger.log("info", `subscriptions on connect`, {
      //     connectionParams: connectionParams,
      //     headers: request.headers,
      //   });
      // },
      // onDisconnect: (webSocket, context) => {
      //   logger.log("info", `subscriptions on disconnect`, {
      //     context: context,
      //   });
      //   webSocket.on("error", (error) => {
      //     logger.log("error", `potential ws err onDisconnect`, {
      //       error: error,
      //     });
      //   });
      // },
      keepAlive: 10000 // use 10000 like prisma or false
    }
  },
  details => {
    logger.info("gql yoga/express server is up", {
      ...details,
      port: details.port
    });
  }
);

module.exports = app;
