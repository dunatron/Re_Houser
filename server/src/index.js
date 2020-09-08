// require("dotenv").config({ path: "./variables-prod.env" })
require("dotenv").config({ path: "./variables.env" });
// require("dotenv").config()
// All about how to deal with chromes new cookie laws https://blog.heroku.com/chrome-changes-samesite-cookie

const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const { convertDocument } = require("./lib/DocGenerator");
const createServer = require("./createServer");
const db = require("./db");
const setupIndexes = require("./lib/algolia/setupIndexes");

const server = createServer();
const { refreshTokens } = require("./auth");
const { JWT_TOKEN_MAX_AGE, rehouserCookieOpt } = require("./const");
var path = require("path");
var fs = require("fs");
var schedule = require("node-schedule");
const {
  payment_intent_succeeded
} = require("./stripe/payment_intent_succeeded");

const bodyParser = require("body-parser");
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const inspectionNotificationTask = require("./lib/leaseTasks/inspectionNotificationTask");

// sets up pasrsing the body of the request
server.use(
  bodyParser.urlencoded({
    extended: true
  })
);

server.use((req, res, next) => {
  if (req.originalUrl === "/stripe/webhook") {
    next();
  } else {
    bodyParser.json()(req, res, next);
  }
});

// ToDo: extract to own file
server.post("/stripe/intent", async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return next();
  }

  if (!req.userId) {
    // throw error. only loigged in users can create intents
  }

  if (!req.body) {
    // throw error
  }

  const { amount, leaseId, walletId } = req.body;

  if (!amount) {
    // throw errro as they must have an amount they intend to pay
  }

  // ToDo: get current logged in user and add there email etc
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "nzd",
      payment_method_types: ["card"],
      metadata: {
        userId: req.userId,
        leaseId: leaseId,
        walletId: walletId
      }
    });

    res.send({ client_secret: paymentIntent.client_secret });
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});

// ToDo: extract to own file
server.post(
  "/stripe/webhook",
  bodyParser.raw({ type: "application/json" }),
  (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
      // On error, log and return the error message
      console.log(`❌ Error message: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "payment_intent.created") {
      console.log("✅ payment_intent.created:");
    }

    if (event.type === "payment_intent.succeeded") {
      payment_intent_succeeded({ event: event, db: db });
    }

    // payment_intent.created && charge.succeeded are different
    if (event.type === "charge.succeeded") {
      console.log("✅ charge.succeeded:", event.data.object);
    }
    console.log("✅ Success:", event.id);
    console.log("✅ EVENT:", event);
    // Return a response to acknowledge receipt of the event
    res.json({ received: true });
  }
);

// lease cronjob tasks
const createLeaseTasks = require("./lib/leaseTasks/index");

createLeaseTasks();

inspectionNotificationTask();

const stripe = require("stripe")(process.env.STRIPE_SECRET);

const expressLogger = function(req, res, next) {
  next();
};

// ToDo: extract to own file
const addUser = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return next();
  }
  try {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    req.userId = userId;
  } catch (err) {
    const refreshToken = req.cookies["refresh-token"];
    if (!refreshToken) {
      return next();
    }

    const newTokens = await refreshTokens(refreshToken, db);
    const cookieOptions = rehouserCookieOpt();
    if (newTokens.token && newTokens.refreshToken) {
      res.cookie("token", newTokens.token, {
        ...cookieOptions
      });
      res.cookie("refresh-token", newTokens.refreshToken, {
        ...cookieOptions
      });
    }
    req.userId = newTokens.user.id;
  }
  return next();
};

server.use(expressLogger);
server.express.use(cookieParser());
server.express.use(addUser);

server.get("/setup-indexes", function(req, res) {
  setupIndexes();
  res.send("Algolia Indexes Initialized");
});

const allowedClientOrigins = [
  "http://localhost:7777",
  "https://rehouser-next-prod.herokuapp.com",
  "http://app.rehouser.co.nz",
  "http://rehouser.co.nz",
  "https://app.rehouser.co.nz",
  "https://rehouser.co.nz",
  "https://yoga.rehouser.co.nz",
  process.env.FRONTEND_URL
];

// Start gql yoga/express server
const app = server.start(
  {
    cors: {
      credentials: true,
      origin: allowedClientOrigins
    },
    port: process.env.PORT || 4444,
    // playground: ??
    subscriptions: {
      keepAlive: true // blindly added this
    }
  },
  details => {
    console.log(`Server DETAILS:${JSON.stringify(details)}`);
    console.log(
      `Server is now running on port http:/localhost:${details.port}`
    );
  }
);

module.exports = app;

// app;
