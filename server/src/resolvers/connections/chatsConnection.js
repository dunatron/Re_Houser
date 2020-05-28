async function chatsConnection(parent, args, ctx, info) {
  const chatsRes = await ctx.db.query.chatsConnection(
    {
      ...args
    },
    info
  );
  return chatsRes;
}

module.exports = chatsConnection;
