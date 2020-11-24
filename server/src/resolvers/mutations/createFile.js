async function createFile(parent, args, ctx, info) {
  const file = await ctx.db.mutation.createFile(
    {
      ...args
    },
    info
  );

  return file;
}

module.exports = createFile;
