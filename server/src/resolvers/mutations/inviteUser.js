const inviteUserToPlatformEmail = require("../../lib/emails/inviteUserToPlatformEmail");
async function inviteUser(parent, { data }, ctx, info) {
  const { email, subUrl, message } = data;

  inviteUserToPlatformEmail({
    email: email,
    user: {},
    invitor: {},
    subUrl: subUrl,
    message: message
  });

  //

  return; // probably a Message Instance
}

module.exports = inviteUser;
