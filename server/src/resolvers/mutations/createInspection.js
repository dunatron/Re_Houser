async function createInspection(parent, args, ctx, info) {
  const inspection = await ctx.db.mutation.createInspection(
    {
      ...args
    },
    info
  );

  return inspection;
}

module.exports = createInspection;
