const { GraphQLServer } = require("graphql-yoga")
const Mutation = require("./resolvers/Mutation")
const Query = require("./resolvers/Query")
const Subscription = require("./resolvers/Subscription")
const db = require("./db")

const {
  DateTimeResolver,
  URLResolver,
  JSONResolver,
} = require("graphql-scalars")

// collect our graphql resolvers
const resolvers = {
  Chat: {
    // messages(chat) {
    //   if (chat.messages === undefined) return null
    //   return chat.messages.filter(m => chat.messages.includes(m.id))
    // },
    // lastMessage(chat) {
    //   if (chat.messages === undefined) return null
    //   const lastMessage = chat.messages[chat.messages.length - 1]
    //   return messages.find(m => m.id === lastMessage)
    // },
  },
  Date: DateTimeResolver,
  URL: URLResolver,
  Json: JSONResolver,
  Query,
  Mutation,
  Subscription,
}

// create the graphql yoga server
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
