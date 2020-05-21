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

// const Stripe = require("stripe");

// const stripe = new Stripe(process.env.STRIPE_SECRET);

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

// // decode the JWT so we can get the user Id on each request
// server.express.use((req, res, next) => {
//   const { token } = req.cookies;
//   console.log("==Request cookies => ", req.cookies);
//   if (token) {
//     const { userId } = jwt.verify(token, process.env.APP_SECRET);
//     // put the userId onto the req for future requests to access
//     req.userId = userId;
//   }
//   next();
// });

// // 2. Create a middleware that populates the user on each request
// server.express.use(async (req, res, next) => {
//   // if they aren't logged in, skip this
//   if (!req.userId) return next();
//   const user = await db.query.user(
//     { where: { id: req.userId } },
//     "{ id, permissions, email, firstName, lastName, phone }"
//   );
//   req.user = user;
//   next();
// });

server.get("/tron-search", function(req, res) {
  var foo = require("../cronjob-files/pages.json");
  res.send(foo);
});

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
server.post("/payments/intents", async (req, res) => {
  console.log("Payment intent req => ", req);
  // const { amount } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1000,
    currency: "nzd",
    payment_method_types: ["card"],
    metadata: { uid: "some_userID" }
  });
  res.send({ client_secret: paymentIntent.client_secret });
  // res.send(paymentIntent);
});

server.post("/payments/webhook", async (req, res) => {
  console.log("payments/webhook RAN");
  console.log("payments/webhook req => ", req.body);
  console.log("payments/webhook req.body => ", req.body);
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
