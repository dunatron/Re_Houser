const { processUpload, deleteFile } = require("../../lib/fileApi");

async function deleteFileMutation(parent, { id }, ctx, info) {
  const file = await ctx.db.query.file({ where: { id } }, `{id url}`);
  if (!file) throw Error(`No file with id of ${id} was found.`);
  if (file) {
    deleteFile({ id: file.id, url: file.url, ctx });
  }

  return { id };
}

module.exports = deleteFileMutation;
