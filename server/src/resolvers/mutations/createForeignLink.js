async function createForeignLink(parent, args, ctx, info) {
  const foreignLink = await ctx.db.mutation.createForeignLink(
    {
      ...args
    },
    info
  );

  return foreignLink;
}

module.exports = createForeignLink;
