async function updatePropertyFiles(parent, { data, where }, ctx, info) {
  const files = await ctx.db.mutation.updatePropertyFiles(
    {
      data,
      where
    },
    info
  );
  return files;
}
module.exports = updatePropertyFiles;
