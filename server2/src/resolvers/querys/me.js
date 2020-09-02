async function me(parent, args, ctx, info) {
  if (!ctx.request.userId) {
    return null;
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
