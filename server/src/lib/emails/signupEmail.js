const { transport, makeANiceEmail } = require("../mail");

const signupEmail = async function({ toEmail, ctx, user }) {
  transport.sendMail({
    from: process.env.MAIL_USER,
    to: toEmail,
    subject: `Welcome to Rehouser`,
    html: makeANiceEmail(
      `
<div style="line-height: 18px;">
  Thank you for Signing up to our platform.
</div>
  \n\n`,
      user
    ),
  });
};

module.exports = signupEmail;
