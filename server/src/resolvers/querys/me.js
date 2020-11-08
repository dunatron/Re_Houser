const testLol = async ({ lol }) => {
  return lol.firstname;
};

async function me(parent, args, ctx, info) {
  if (!ctx.request.userId) {
    return null;
    // return null;
  }
  const currentUser = await ctx.db.query.user(
    {
      where: { id: ctx.request.userId },
    },
    info
  );

  // testLol();

  return currentUser;
}

module.exports = me;
