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

const bodyParser = require("body-parser");

// sets up pasrsing the body of the request
server.use(
  bodyParser.urlencoded({
    extended: true
  })
);

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
server.use(bodyParser.json());

const createLeaseTasks = require("./lib/leaseTasks/index");

createLeaseTasks();

const stripe = require("stripe")(process.env.STRIPE_SECRET);

const expressLogger = function(req, res, next) {
  next();
};

// we could essentially add more than userId, like permissions?
// the jwt would not verify if they tried to modify permissions etc
// currently this logic will not work. as when the token expires we are not sending it along
// meaning if(!token) will be true and we get no chance to refresh
// play with this and if we cannot get expired token being sent then if !token
// check for refreshToken, then do logic to refresh both
// we could have 2 different token expiry dates...
const addUser = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    console.log("This request is not authenticated");
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
    req.loggedInUser = newTokens.user;
    req.userId = newTokens.user.id;
  }
  return next();
};

server.use(expressLogger);
//disable cors for now
// server.use(cors())

server.express.use(cookieParser());
server.express.use(addUser);

server.get("/setup-indexes", function(req, res) {
  setupIndexes();
  res.send("complete");
});

const allowedClientOrigins = [
  "http://localhost:7777",
  "https://rehouser-next-prod.herokuapp.com",
  "http://app.rehouser.co.nz",
  "http://rehouser.co.nz",
  process.env.FRONTEND_URL
];

// Maybe try doing this to test ios gets its cookies???
// comment out for now because we do it below? maybe both isnt bad??
server.use(cors({ origin: allowedClientOrigins, credentials: true }));

//https://fireship.io/lessons/stripe-payment-intents-tutorial/
//stripe.com/docs/payments/payment-intents/migration
//https://fireship.io/lessons/stripe-payment-intents-tutorial/
server.post("/payments/intents", async (req, res, next) => {
  // console.log("Payment intent req => ", req);

  const token = req.cookies.token;
  if (!token) {
    console.log(
      "we cannot fulfill your intent because we cant be sure you are a valid usert"
    );
    return next();
  }

  if (!req.body) {
    // throw error
  }

  const { amount } = req.body;

  if (!amount) {
    // throw errro as they must have an amount they intend to pay
  }

  console.log("The amount sent => ", amount);

  // ToDo: get current logged in user and add there email etc
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "nzd",
    payment_method_types: ["card"],
    metadata: { uid: "some_userID" }
  });
  res.send({ client_secret: paymentIntent.client_secret });
  // res.send(paymentIntent);
});

server.post("/payments/webhook", async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecretKey = process.env.STRIPE_SECRET;

  let event;

  try {
    console.log("Falling over after this below func");
    event = stripe.webhooks.constructEvent(
      req.body.rawBody,
      sig,
      endpointSecretKey
    );

    console.log("Give me a look at the hook event => ", event);
  } catch (err) {
    console.log("AN error occurred => ", err);
    res.status(400).end();
  }
});

//1. put into own file that handles all of this logic please

// const bodyParser = require("body-parser");
// server.use(server.express.urlencoded());

// // Parse JSON bodies (as sent by API clients)
// server.use(server.express.json());

// // Access the parse results as request.body
// server.post("/helpme", function(request, response) {
//   console.log(request.body);
//   // console.log(request.body.user.email);
// });

// var bodyParser = require("body-parser");

// // create application/json parser
// var jsonParser = bodyParser.json();

// // create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded({ extended: false });

// // POST /login gets urlencoded bodies
// server.post("/login", urlencodedParser, function(req, res) {
//   res.send("welcome, " + req.body.username);
// });

// POST /api/users gets JSON bodies
// server.post("/helpme", jsonParser, function(req, res) {
//   // create user in req.body
//   console.log("FFS => ", req.body);
// });

server.post("/helpme", function(req, res) {
  // create user in req.body
  console.log("FFS => ", req.body);
});

server.start(
  {
    cors: {
      credentials: true,
      origin: allowedClientOrigins
    },
    port: process.env.PORT || 4444,
    // playground: ??
    subscriptions: {}
  },
  details => {
    console.log(`Server DETAILS:${JSON.stringify(details)}`);
    console.log(
      `Server is now running on port http:/localhost:${details.port}`
    );
  }
);

// server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
//   console.log(`🚀 Server ready at ${url}`);
// });
// server.start({ port: process.env.PORT || 4000 }).then(({ url }) => {
//   console.log(`🚀 Server ready at ${url}`);
// });
