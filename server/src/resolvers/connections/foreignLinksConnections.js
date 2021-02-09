async function foreignLinksConnection(parent, args, ctx, info) {
  const result = await ctx.db.query.foreignLinksConnection(
    {
      ...args
    },
    info
  );
  return result;
}

module.exports = foreignLinksConnection;
