async function updateRentalAppraisal(parent, { data, where }, ctx, info) {
  const rentalApplication = await ctx.db.mutation.updateRentalAppraisal(
    {
      data,
      where
    },
    info
  );
  return rentalApplication;
}

module.exports = updateRentalAppraisal;
