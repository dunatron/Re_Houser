const { processUpload, deleteFile } = require("../../lib/fileApi");

async function uploadSignature(parent, { file }, ctx, info) {
  if (!ctx.request.userId) {
    throw new Error("You must be logged in!");
  }
  // get current user photo id
  const currData = await ctx.db.query.user(
    {
      where: {
        id: ctx.request.userId
      }
    },
    `{ signature{id, url} }`
  );
  // delete file on cloudinary if we have one
  if (currData.signature) {
    await deleteFile({
      id: currData.signature.id,
      url: currData.signature.url,
      ctx
    });
  }
  // upload file to cloudinary
  const uploadedFile = await processUpload(await file, ctx);
  // update user
  const updatedUser = await ctx.db.mutation.updateUser(
    {
      where: {
        id: ctx.request.userId
      },
      data: {
        signature: {
          connect: {
            id: uploadedFile.id
          }
        }
      }
    },
    info
  );
  return updatedUser;
}

module.exports = uploadSignature;
