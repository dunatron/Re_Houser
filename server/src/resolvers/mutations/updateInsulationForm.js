async function updateInsulationForm(parent, { data, where }, ctx, info) {
  const updatedGroupApplicant = await ctx.db.mutation.updateInsulationForm(
    {
      data,
      where
    },
    info
  );
  return updatedGroupApplicant;
}

module.exports = updateInsulationForm;
