async function users(parent, args, ctx, info) {
  // 1. Check if they are logged in
  // if (!ctx.request.userId) {
  //   throw new Error("You must be logged in!")
  // }
  // // 2. Check if the user has the permissions to query all the users
  // hasPermission(ctx.request.user, ["ADMIN", "PERMISSIONUPDATE"])
  // 2. if they do, query all the users!
  // return ctx.db.query.users({}, info);
  return ctx.db.query.users(
    {
      ...args
    },
    info
  );
}

module.exports = users;
