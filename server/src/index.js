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
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
// const webhookSecret = "whsec_JjL6QaWRq5ueLZJVXnVascAUgPANzYsF";
// web hook secret is diff from stripe. and in local we dynamically get it when
// we run stripe:listen
// whsec_JjL6QaWRq5ueLZJVXnVascAUgPANzYsF

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

// Stripe requires the raw body to construct the event
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

    // Successfully constructed event
    console.log("✅ Success:", event.id);

    // Return a response to acknowledge receipt of the event
    res.json({ received: true });
  }
);

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
// server.use(
//   bodyParser.json({
//     verify: function(req, res, buf) {
//       var url = req.originalUrl;
//       console.log("==OK WHAT IS URL PARSED==> ", url);
//       if (url === "/stripe/webhook") {
//         console.log("==COOL STRIPE EXPLICIT URL WORK==> ");
//         req.rawBody = buf.toString();
//       }
//       // if (url.startsWith("/stripe")) {
//       //   console.log("Stripe endpoint");
//       //   req.rawBody = buf.toString();
//       // }
//     }
//   })
// );

// Use JSON parser for all non-webhook routes
// server.use((req, res, next) => {
//   if (req.originalUrl === "/stripe/webhook") {
//     next();
//   } else {
//     bodyParser.json()(req, res, next);
//   }
// });

// server.use(bodyParser.json());

// app.use(bodyParser.json({
//   // Because Stripe needs the raw body, we compute it but only when hitting the Stripe callback URL.
//   verify: function(req,res,buf) {
//       var url = req.originalUrl;
//       if (url.startsWith('/stripe-webhooks')) {
//           req.rawBody = buf.toString()
//       }
//   }}));

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
    console.log("no token for add user");
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
// server.post("/payment/intents", async (req, res, next) => {
//   // console.log("Payment intent req => ", req);
//   console.log("Payment intent being hit");

//   const token = req.cookies.token;
//   if (!token) {
//     console.log(
//       "we cannot fulfill your intent because we cant be sure you are a valid usert"
//     );
//     return next();
//   }

//   if (!req.body) {
//     // throw error
//   }

//   const { amount } = req.body;

//   if (!amount) {
//     // throw errro as they must have an amount they intend to pay
//   }

//   console.log("The amount sent => ", amount);

//   // ToDo: get current logged in user and add there email etc
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: amount,
//     currency: "nzd",
//     payment_method_types: ["card"],
//     metadata: { uid: "some_userID" }
//   });
//   res.send({ client_secret: paymentIntent.client_secret });
//   // res.send(paymentIntent);
// });

server.post("/stripe/intent", async (req, res, next) => {
  // console.log("Payment intent req => ", req);
  console.log("==START PAYMENT INTENT==");
  console.log(
    "Make sure to send the info we need back here in the metadata etc"
  );

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

  console.log("clients amount they are intent to pay => ", amount);

  // ToDo: get current logged in user and add there email etc
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "nzd",
    payment_method_types: ["card"],
    metadata: { uid: "some_userID" }
  });
  console.log("paymentIntent.client_secret => ", paymentIntent.client_secret);
  console.log("==END PAYMENT INTENT==");
  res.send({ client_secret: paymentIntent.client_secret });
  // res.send(paymentIntent);
});

// server.post(
//   "/stripe/webhook",
//   bodyParser.raw({ type: "application/json" }),
//   async (req, res) => {
//     console.log("==START STRIPE WEBHOOK==");
//     console.log("Webhook type => ", req.body.type);
//     const sig = req.headers["stripe-signature"];
//     const endpointSecretKey = process.env.STRIPE_SECRET;

//     let event;

//     console.log("sig => ", sig);
//     console.log("req.body => ", req.body);
//     console.log("req.rawBody => ", req.rawBody);

//     if (req.body.type === "payment_intent.created") {
//       console.log("Stripe webhook for intent created was caught");
//     }

//     if (req.body.type === "charge.failed") {
//       console.log("Possibly wont need to do anything with this???");
//       // maybe send an email to them saying looks like the charge failed
//     }
//     if (req.body.type === "payment_intent.succeeded") {
//       console.log("Stripe payment intent has succeded");
//       // we need to validate the data send to make sure it hasnt been altered.
//       // we are using this inflo to update the wallet so super important that this data can be trusted
//       // event = stripe.webhooks.constructEvent(
//       //   req.body.rawBody,
//       //   sig,
//       //   endpointSecretKey
//       // );
//       // event = stripe.webhooks.constructEvent(req.body, sig, endpointSecretKey);
//       event = stripe.webhooks.constructEvent(
//         req.rawBody,
//         sig,
//         endpointSecretKey
//       );
//       console.log("Payment succeded but is the json valid? => ", event);
//     }

//     // try {
//     //   // console.log("Falling over after this below func");
//     //   // event = stripe.webhooks.constructEvent(
//     //   //   req.body.rawBody,
//     //   //   sig,
//     //   //   endpointSecretKey
//     //   // );

//     //   event = stripe.webhooks.constructEvent(req.body, sig, endpointSecretKey);

//     //   // console.log("Give me a look at the hook event => ", event);
//     //   console.log("==START STRIPE WEBHOOK==");
//     // } catch (err) {
//     //   // console.log("AN error occurred => ", err);
//     //   res.status(400).end();
//     // }
//   }
// );

// https://github.com/stripe/stripe-node#webhook-signing
// https://github.com/stripe/stripe-node/tree/master/examples/webhook-signing
// server.post("/stripe/webhook", async (req, res) => {
//   console.log("==START STRIPE WEBHOOK==");
//   console.log("Webhook type => ", req.body.type);
//   const sig = req.headers["stripe-signature"];
//   const endpointSecretKey = process.env.STRIPE_SECRET;

//   let event;

//   console.log("sig => ", sig);
//   console.log("req.body => ", req.body);
//   console.log("req.rawBody => ", req.rawBody);

//   if (req.body.type === "payment_intent.created") {
//     console.log("Stripe webhook for intent created was caught");
//   }

//   if (req.body.type === "charge.failed") {
//     console.log("Possibly wont need to do anything with this???");
//     // maybe send an email to them saying looks like the charge failed
//   }
//   if (req.body.type === "payment_intent.succeeded") {
//     console.log("Stripe payment intent has succeded");
//     // we need to validate the data send to make sure it hasnt been altered.
//     // we are using this inflo to update the wallet so super important that this data can be trusted
//     // event = stripe.webhooks.constructEvent(
//     //   req.body.rawBody,
//     //   sig,
//     //   endpointSecretKey
//     // );
//     // event = stripe.webhooks.constructEvent(req.body, sig, endpointSecretKey);
//     event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecretKey);
//     console.log("Payment succeded but is the json valid? => ", event);
//   }

//   // try {
//   //   // console.log("Falling over after this below func");
//   //   // event = stripe.webhooks.constructEvent(
//   //   //   req.body.rawBody,
//   //   //   sig,
//   //   //   endpointSecretKey
//   //   // );

//   //   event = stripe.webhooks.constructEvent(req.body, sig, endpointSecretKey);

//   //   // console.log("Give me a look at the hook event => ", event);
//   //   console.log("==START STRIPE WEBHOOK==");
//   // } catch (err) {
//   //   // console.log("AN error occurred => ", err);
//   //   res.status(400).end();
//   // }
// });

// server.post("/payments/webhook", async (req, res) => {
//   console.log("Webhook being hit??");
//   const sig = req.headers["stripe-signature"];
//   const endpointSecretKey = process.env.STRIPE_SECRET;

//   let event;

//   console.log("sig => ", sig);
//   console.log("req.body => ", req.body);
//   console.log("req.rawBody => ", req.rawBody);

//   try {
//     console.log("Falling over after this below func");
//     // event = stripe.webhooks.constructEvent(
//     //   req.body.rawBody,
//     //   sig,
//     //   endpointSecretKey
//     // );

//     event = stripe.webhooks.constructEvent(req.body, sig, endpointSecretKey);

//     console.log("Give me a look at the hook event => ", event);
//   } catch (err) {
//     console.log("AN error occurred => ", err);
//     res.status(400).end();
//   }
// });

// Start gql express server
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
