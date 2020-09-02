const { deleteFile } = require("../../lib/fileApi");

async function deleteFileMutation(parent, { id }, ctx, info) {
  // const file = await ctx.db.query.file({ where: { id } }, `{id url}`);
  const file = await ctx.db.query.file({ where: { id } }, info);
  if (!file) throw Error(`No file with id of ${id} was found.`);
  if (file) {
    await deleteFile({ id: file.id, url: file.url, ctx }); //too many ifys. jus delete the connection
    return await ctx.db.mutation.deleteFile(
      {
        where: {
          id: id,
        },
      },
      info
    );
  }
  throw Error(`Something went wrong with removing the file`);
}

module.exports = deleteFileMutation;
