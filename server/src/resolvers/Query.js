const { forwardTo } = require("prisma-binding")
const { hasPermission } = require("../lib/utils")

const Query = {
  me(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      return null
    }
    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId },
      },
      info
    )
  },
  async users(parent, args, ctx, info) {
    // 1. Check if they are logged in
    if (!ctx.request.userId) {
      throw new Error("You must be logged in!")
    }
    // 2. Check if the user has the permissions to query all the users
    hasPermission(ctx.request.user, ["ADMIN", "PERMISSIONUPDATE"])
    // 2. if they do, query all the users!
    return ctx.db.query.users({}, info)
  },
  file(parent, { id }, context, info) {
    return context.db.query.file({ where: { id } }, info)
  },

  files(parent, args, context, info) {
    return context.db.query.files(args, info)
  },
}

module.exports = Query
