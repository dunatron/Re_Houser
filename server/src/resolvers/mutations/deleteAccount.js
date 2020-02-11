const { processUpload, deleteFile } = require("../../lib/fileApi");
const bcrypt = require("bcryptjs");

async function deleteAccount(parent, { email, password }, ctx, info) {
  const user = await ctx.db.query.user(
    { where: { email: email } },
    `{id, email, profilePhoto, photoIdentification}`
  );
  if (!user) {
    throw new Error(`No such user found for email ${email}`);
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error("Invalid Password!");
  }
  //   const deletedUser = await ctx.db.mutation.deleteUser
  // wrap below in an if file
  //   const file = await ctx.db.query.file({ where: { id } }, `{id url}`);
  //   if (file) {
  //     deleteFile({ id: file.id, url: file.url, ctx });
  //   }
  //   return { id };
  // return await ctx.db.mutation.deleteFile({ where: { id } }, info)
}

module.exports = deleteAccount;
