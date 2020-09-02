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
