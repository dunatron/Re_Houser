async function updateRentalApplication(parent, { data, where }, ctx, info) {
  const rentalApplication = await ctx.db.mutation.updateRentalApplication(
    {
      data,
      where
    },
    info
  );
  return rentalApplication;
}

module.exports = updateRentalApplication;
