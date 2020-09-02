//PropertyFiles
async function propertyFiles(parent, args, ctx, info) {
  console.log("AHhhyhy");
  const associatedFiles = await ctx.db.query.propertyFiles({ ...args }, info);

  console.log("associatedFiles => ", associatedFiles);

  return associatedFiles;
}

module.exports = propertyFiles;
