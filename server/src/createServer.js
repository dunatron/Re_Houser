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
const gqlLogger = require("./middleware/loggers/gqlLogger");

// https://www.robinwieruch.de/graphql-apollo-server-tutorial

const {
  DateTimeResolver,
  URLResolver,
  JSONResolver
} = require("graphql-scalars");

const { _isAdmin } = require("./lib/permissionsCheck");
const { _isUploader, _isUploaderOrAdmin } = require("./lib/fileApi");

/**
 * Four arguments to potentially resolve a type and its fields
 * parent => The return value of the resolver for this field's parent (i.e., the previous resolver in the resolver chain)
 * args => An object that contains all GraphQL arguments provided for this field.
 * context => An object shared across all resolvers that are executing for a particular operation. Use this to share per-operation state, including authentication information, dataloader instances, and anything else to track across resolvers
 * info => Contains information about the operation's execution state, including the field name, the path to the field from the root, and more.
 */

const stockImageUrl = `${process.env.FRONTEND_URL}/images/private_stock.jpg`;

const resolvers = {
  User: {
    photoIdentification: (parent, args, ctx, info) => {
      const publicObj = {
        ...parent.photoIdentification,
        url: stockImageUrl,
        secure_url: stockImageUrl
      };
      if (parent.photoIdentification === null) return null;
      if (!_isUploaderOrAdmin({ file: parent.photoIdentification, ctx: ctx })) {
        return publicObj;
      }
      return parent.photoIdentification;
    }
  },
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
  File: {
    url: (file, args, ctx, info) => {
      // I guess all admins can see private files. apart from that you must be uploader of the file!
      if (file.type === "private") {
        if (!_isUploaderOrAdmin({ file: file, ctx })) {
          return stockImageUrl;
        }
      }
      return file.url;
    },
    secure_url: (file, args, ctx, info) => {
      // I guess all admins can see private files. apart from that you must be uploader of the file!
      if (file.type === "private") {
        if (!_isUploaderOrAdmin({ file: file, ctx })) {
          return stockImageUrl;
        }
      }
      return file.secure_url;
    }
  },
  Property: {
    files: (parent, args, ctx, field) => {
      // I actually anticipate files being already associated with the property.
      // So if this is null. create new PropertyFiles row and associate it with property
      // throw new Error(
      //   "Purposely throwing an error when you try to get the files from a property"
      // );
      return {
        ...parent.files
      };
    },
    insulationStatementFile: {}
  },
  Date: DateTimeResolver,
  URL: URLResolver,
  Json: JSONResolver,
  // Query,
  Query: {
    ...Query,
    ...Connection // simply relay versions e.g aggregate and edges
  },
  Mutation,
  Subscription
};
const pubsub = new PubSub();

/**
 * Gql Middlewares
 * https://github.com/prisma-labs/graphql-middleware
 */
const logInput = async (resolve, root, args, context, info) => {
  // try catch and log errors?
  const result = await resolve(root, args, context, info);
  gqlLogger.info("gql-input", {
    result: result
  });
  return result;
};

const logResult = async (resolve, root, args, context, info) => {
  const result = await resolve(root, args, context, info);
  gqlLogger.info("gql-result", {
    result: result
  });
  return result;
};

// create the graphql yoga server
function createServer() {
  return new GraphQLServer({
    typeDefs: "src/schema.graphql",
    resolvers: resolvers,
    middlewares: [logInput, logResult],
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    // context: req => ({ ...req, db }) // probs just put this back
    context: req => ({ ...req, db, pubsub }) // maybe this
    // context: { pubsub }
  });
}

module.exports = createServer;
