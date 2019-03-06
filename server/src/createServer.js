const { GraphQLServer } = require("graphql-yoga")
const Mutation = require("./resolvers/Mutation")
const Query = require("./resolvers/Query")
const db = require("./db")

/** collect our graphql resolvers **/
const resolvers = {
  Query,
  Mutation,
}

/** create the graphql yoga server **/
function createServer() {
  return new GraphQLServer({
    typeDefs: "src/schema.graphql",
    resolvers: resolvers,
    resolverValidationOptions: {
      requireResolversForResolveType: false,
    },
    context: req => ({ ...req, db }),
  })
}

module.exports = createServer
