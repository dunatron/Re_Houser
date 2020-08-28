//PropertyFiles
async function propertyFiles(parent, args, ctx, info) {
  return ctx.db.query.propertyFiles(args, info);
}

module.exports = propertyFiles;
