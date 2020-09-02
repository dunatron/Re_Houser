require("dotenv").config({ path: "./variables.env" });
const { ApolloServer, gql } = require("apollo-server");
const { importSchema } = require("graphql-import");
const createServer = require("./createServer");

const server = createServer();

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
