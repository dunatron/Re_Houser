const testMe = async user => {
  return user.firstname;
};

async function me(parent, args, ctx, info) {
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
  testMe();
  return currentUser;
}

module.exports = me;
