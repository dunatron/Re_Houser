async function updateInspection(parent, args, ctx, info) {
  const inspection = await ctx.db.mutation.updateInspection(
    {
      ...args
    },
    info
  );

  return inspection;
}

module.exports = updateInspection;
