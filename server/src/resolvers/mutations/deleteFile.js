const { processUpload, deleteFile } = require("../../lib/fileApi");

async function deleteFileMutation(parent, { id }, ctx, info) {
  const file = await ctx.db.query.file({ where: { id } }, `{id url}`);
  if (file) {
    deleteFile({ id: file.id, url: file.url, ctx });
  }
  return { id };
  // return await ctx.db.mutation.deleteFile({ where: { id } }, info)
}

module.exports = deleteFileMutation;
