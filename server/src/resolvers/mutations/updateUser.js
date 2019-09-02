const { processUpload } = require("../../lib/fileApi");

async function updateUser(parent, { data, photoFile }, ctx, info) {
  const uploadedPhoto = photoFile
    ? await processUpload(await photoFile, ctx)
    : null;
  const userData = {
    ...data,
    photoIdentification: photoFile
      ? {
          connect: {
            id: uploadedPhoto.id
          }
        }
      : {}
  };
  const updatedUser = await ctx.db.mutation.updateUser(
    { data: userData, where: { id: ctx.request.userId } },
    info
  );
  return updatedUser;
}

module.exports = updateUser;
