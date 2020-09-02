const { deleteFile } = require("../../lib/fileApi");

async function renameFile(parent, { id }, ctx, info) {
  const file = await ctx.db.query.file({ where: { id } }, `{id url}`);
  if (file) {
    deleteFile({ id: file.id, url: file.url, ctx });
  }
  return { id };
}

module.exports = renameFile;
