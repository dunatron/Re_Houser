async function updateViewing(parent, { data, where }, ctx, info) {
  const viewing = await ctx.db.mutation.updateViewing(
    {
      data,
      where
    },
    info
  );
  return viewing;
}

module.exports = updateViewing;
