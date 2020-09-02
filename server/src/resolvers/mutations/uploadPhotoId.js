const { processUpload, deleteFile } = require("../../lib/fileApi");

async function uploadPhotoId(parent, { file, photoId }, ctx, info) {
  if (!ctx.request.userId) {
    throw new Error("You must be logged in!");
  }
  // get current user photo id
  const currData = await ctx.db.query.user(
    {
      where: {
        id: ctx.request.userId,
      },
    },
    `{ photoIdentification{id, url} }`
  );
  // delete file on cloudinary if we have one
  if (currData.photoIdentification) {
    await deleteFile({
      id: currData.photoIdentification.id,
      url: currData.photoIdentification.url,
      ctx,
    });
  }
  // upload file to cloudinary
  const uploadedFile = await processUpload({
    upload: file,
    ctx,
    info,
    data: {
      type: "private",
    },
  });
  // update user
  const updatedUser = await ctx.db.mutation.updateUser(
    {
      where: {
        id: ctx.request.userId,
      },
      data: {
        photoIdentification: {
          connect: {
            id: uploadedFile.id,
          },
        },
        identificationNumber: photoId,
      },
    },
    info
  );
  return updatedUser;
}

module.exports = uploadPhotoId;
