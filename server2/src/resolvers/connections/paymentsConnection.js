async function paymentsConnection(parent, args, ctx, info) {
  const result = await ctx.db.query.paymentsConnection(
    {
      ...args
    },
    info
  );
  return result;
}

module.exports = paymentsConnection;
