async function updateForeignLink(parent, args, ctx, info) {
  const updatedForeignLink = await ctx.db.mutation.updateForeignLink(
    {
      ...args,
    },
    info
  );

  return updatedForeignLink;
}

module.exports = updateForeignLink;
