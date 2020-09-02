const {
  GraphQLServer,
  PubSub,
  SchemaDirectiveVisitor
} = require("graphql-yoga");
const Mutation = require("./resolvers/Mutation");
const Query = require("./resolvers/Query");
const Connection = require("./resolvers/Connection");
const Subscription = require("./resolvers/Subscription");
const db = require("./db");
// const {importSchema} = require("graphql-tools")
const { makeExecutableSchema } = require("graphql-tools");
const { importSchema } = require("graphql-import");

const typeDefs = importSchema("src/schema.graphql");

// const typeDefs

// APollo server 2.0

const { ApolloServer, gql } = require("apollo-server");

// https://www.robinwieruch.de/graphql-apollo-server-tutorial

// https://medium.com/@0n3z3r0n3/prisma-graphql-project-setup-pt2-apollo-server-client-3caf44099f8c

const {
  DateTimeResolver,
  URLResolver,
  JSONResolver
} = require("graphql-scalars");

// /**
//  * Four arguments to potentially resolve a type and its fields
//  * parent => The return value of the resolver for this field's parent (i.e., the previous resolver in the resolver chain)
//  * args => An object that contains all GraphQL arguments provided for this field.
//  * context => An object shared across all resolvers that are executing for a particular operation. Use this to share per-operation state, including authentication information, dataloader instances, and anything else to track across resolvers
//  * info => Contains information about the operation's execution state, including the field name, the path to the field from the root, and more.
//  */

const resolvers = {
  Date: DateTimeResolver,
  URL: URLResolver,
  Json: JSONResolver,
  Query: {
    ...Query,
    ...Connection // simply relay versions e.g aggregate and edges
  },
  Mutation,
  Subscription,
  Node: {
    __resolveType() {
      return null;
    }
  }
};

// create the graphql yoga server
function createServer() {
  return new ApolloServer({
    // typeDefs: "src/schema.graphql",
    typeDefs: typeDefs,
    resolvers: resolvers,
    context: ({ req }) => ({
      ...req,
      db
    })
  });
}

module.exports = createServer;
