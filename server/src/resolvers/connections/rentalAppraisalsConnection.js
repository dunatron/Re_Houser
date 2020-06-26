async function rentalAppraisalsConnection(parent, args, ctx, info) {
  const result = await ctx.db.query.rentalAppraisalsConnection(
    {
      ...args
    },
    info
  );
  return result;
}

module.exports = rentalAppraisalsConnection;
