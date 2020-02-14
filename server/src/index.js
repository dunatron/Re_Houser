// require("dotenv").config({ path: "./variables-prod.env" })
require("dotenv").config({ path: "./variables.env" });
// require("dotenv").config()
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const { convertDocument } = require("./lib/DocGenerator");
const createServer = require("./createServer");
const db = require("./db");
const setupIndexes = require("./lib/algolia/setupIndexes");

const server = createServer();
const { refreshTokens } = require("./auth");
const { JWT_TOKEN_MAX_AGE } = require("./const");
var path = require("path");
var fs = require("fs");

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
  console.log("Checking user on every request");
  const token = req.cookies.token;
  console.log("Add User token => ", token);
  if (!token) {
    console.log("This request is not authenticated");
    return next();
  }
  try {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    console.log("token was verified and userId is => ", userId);
    req.userId = userId;
  } catch (err) {
    console.log("error verifying token err => ", err);
    const refreshToken = req.cookies["refresh-token"];
    console.log("do we have a refreshToken? ", refreshToken);
    if (!refreshToken) {
      console.log("well no refresh token... ");
      return next();
    }

    const newTokens = await refreshTokens(refreshToken, db);
    console.log("about to try refresh your tokens ");
    if (newTokens.token && newTokens.refreshToken) {
      res.cookie("token", newTokens.token, {
        maxAge: JWT_TOKEN_MAX_AGE,
        httpOnly: true
      });
      res.cookie("refresh-token", newTokens.refreshToken, {
        maxAge: JWT_TOKEN_MAX_AGE,
        httpOnly: true
      });
    }
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
