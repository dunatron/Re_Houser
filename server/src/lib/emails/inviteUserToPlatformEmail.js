const { transport, makeANiceEmail } = require("../mail");
const { CEO_DETAILS } = require("../../const");

const inviteUserToPlatformEmail = async function({
  email,
  user,
  invitor,
  subUrl,
  message
}) {
  return transport.sendMail({
    from: process.env.MAIL_USER,
    to: email,
    // subject: "Invitation to Rehouser",
    from: {
      name: "Rehouser Platform Invite",
      address: process.env.MAIL_USER
    },
    html: makeANiceEmail(
      `${invitor &&
        invitor.firstName} has invited you to the rehouser property platform!
        \n\n
        <a href="${
          process.env.FRONTEND_URL
        }${subUrl}">They have invited you to this section</a>
        <div style="line-height: 18px;">
            ${message}
        </div>
        `,
      user
    )
  });
};

module.exports = inviteUserToPlatformEmail;
