//PropertyFiles
async function propertyFiles(parent, args, ctx, info) {
  const associatedFiles = await ctx.db.query.propertyFiles({ ...args }, info);
  return associatedFiles;
}

module.exports = propertyFiles;
