// async users(parent, args, ctx, info) {
//   // 1. Check if they are logged in
//   // if (!ctx.request.userId) {
//   //   throw new Error("You must be logged in!")
//   // }
//   // // 2. Check if the user has the permissions to query all the users
//   // hasPermission(ctx.request.user, ["ADMIN", "PERMISSIONUPDATE"])
//   // 2. if they do, query all the users!
//   return ctx.db.query.users({}, info)
// },

async function findUsers(parent, args, ctx, info) {
  const users = await ctx.db.query.users(
    {
      ...args
    },
    info
  );
  return users;
}

module.exports = findUsers;

// orderBy: UserOrderByInput
// skip: Int
// after: String
// before: String
// first: Int
// last: Int
