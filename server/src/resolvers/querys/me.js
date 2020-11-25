async function me(parent, args, ctx, info) {
  // const currentUser = await ctx.db.query.user(
  //   {
  //     where: { id: "rehouser-cto-id" }
  //   },
  //   info
  // );
  // return currentUser;

  if (!ctx.request.userId) {
    return null;
    // return null;
  }
  const currentUser = await ctx.db.query.user(
    {
      where: { id: ctx.request.userId }
    },
    info
  );
  return currentUser;
}

module.exports = me;
