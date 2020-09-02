async function rentalApplicationsConnection(parent, args, ctx, info) {
  const result = await ctx.db.query.rentalApplicationsConnection(
    {
      ...args
    },
    info
  );
  return result;
}

module.exports = rentalApplicationsConnection;
