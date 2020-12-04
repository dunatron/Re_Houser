const inviteUserToPlatformEmail = require("../../lib/emails/inviteUserToPlatformEmail");
async function inviteUser(parent, { data }, ctx, info) {
  const userId = ctx.request.userId;
  const { email, subUrl, message } = data;

  if (!userId) {
    throw new Error("You must be signed in to invite others to the platform");
  }

  const invitor = await ctx.db.query.user(
    {
      where: {
        id: userId
      }
    },
    `{ id, firstName, lastName }`
  );

  const mailRes = await inviteUserToPlatformEmail({
    email: email,
    user: {},
    invitor: invitor,
    subUrl: subUrl,
    message: message
  });

  console.log("The mail res => ", mailRes);

  //

  return {
    message: `Invite sent to ${email}`,
    data: mailRes
  }; // probably a Message Instance
}

module.exports = inviteUser;
