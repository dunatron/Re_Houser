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

// const server = new ApolloServer({
//   typeDefs,
//   resolvers
// });

// Start gql yoga/express server
server.listen(
  {
    cors: {
      credentials: true
      // origin: allowedClientOrigins
    },
    // port: process.env.PORT || 4444,
    port: 4444,
    // playground: ??
    subscriptions: {
      keepAlive: true // blindly added this
    }
  }
  // details => {
  //   console.log(`Server DETAILS:${JSON.stringify(details)}`);
  //   console.log(
  //     `Server is now running on port http:/localhost:${details.port}`
  //   );
  // }
);
