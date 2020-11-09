const testMe = async user => {
  return user.firstname;
};

async function crashMe(parent, args, ctx, info) {
  coooleao();
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

module.exports = crashMe;
