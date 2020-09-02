const { deleteFile } = require("../../lib/fileApi");
const bcrypt = require("bcryptjs");

async function deleteAccount(parent, { email, password }, ctx, info) {
  const user = await ctx.db.query.user(
    { where: { email: email } },
    `{id, email, password, profilePhoto {id,filename}, photoIdentification{id,filename}}`
  );

  const { profilePhoto, photoIdentification } = user;
  if (!user) {
    throw new Error(`No such user found for email ${email}`);
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error("Invalid Password!");
  }
  // cleanup and delete and image files associated with the user
  if (profilePhoto) {
    deleteFile({ id: profilePhoto.id, url: profilePhoto.url, ctx });
  }
  if (photoIdentification) {
    deleteFile({
      id: photoIdentification.id,
      url: photoIdentification.url,
      ctx,
    });
  }

  await ctx.db.mutation.deleteUser({ where: { email: email } });

  const message = {
    message: `The account with an email of ${email} has been deleted`,
  };

  return message;
}

module.exports = deleteAccount;
