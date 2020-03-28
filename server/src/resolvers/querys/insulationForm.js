async function insulationForm(parent, args, ctx, info) {
  const requestedInsulationForm = await ctx.db.query.insulationForm(
    {
      ...args
    },
    info
  );
  if (!requestedInsulationForm) {
    throw new Error("Insulation form does not exist");
  }
  return requestedInsulationForm;
}

module.exports = insulationForm;
