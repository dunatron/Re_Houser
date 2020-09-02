async function rentalAppraisals(parent, args, ctx, info) {
  const rentalAppraisals = await ctx.db.query.rentalAppraisals(
    {
      ...args
    },
    info
  );
  return rentalAppraisals;
}

module.exports = rentalAppraisals;
