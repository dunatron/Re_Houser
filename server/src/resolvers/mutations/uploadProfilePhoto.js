const { processUpload, deleteFile } = require("../../lib/fileApi");

async function uploadProfilePhoto(parent, { file }, ctx, info) {
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
    `{ profilePhoto{id, url} }`
  );
  // delete file on cloudinary if we have one
  if (currData.profilePhoto) {
    await deleteFile({
      id: currData.profilePhoto.id,
      url: currData.profilePhoto.url,
      ctx,
    });
  }
  // upload file to cloudinary
  const uploadedFile = await processUpload({
    upload: file,
    ctx: ctx,
    info,
  });
  // update user
  const updatedUser = await ctx.db.mutation.updateUser(
    {
      where: {
        id: ctx.request.userId,
      },
      data: {
        profilePhoto: {
          connect: {
            id: uploadedFile.id,
          },
        },
      },
    },
    info
  );
  return updatedUser;
}

module.exports = uploadProfilePhoto;
