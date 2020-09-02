async function updateRentalGroupApplicant(parent, { data, where }, ctx, info) {
  // data.completed = true
  const updatedGroupApplicant = await ctx.db.mutation.updateRentalGroupApplicant(
    {
      data,
      where
    },
    info
  );
  return updatedGroupApplicant;
}

module.exports = updateRentalGroupApplicant;
