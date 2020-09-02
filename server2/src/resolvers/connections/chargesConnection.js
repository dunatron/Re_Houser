async function chargesConnection(parent, args, ctx, info) {
  const result = await ctx.db.query.chargesConnection(
    {
      ...args
    },
    info
  );
  return result;
}

module.exports = chargesConnection;
