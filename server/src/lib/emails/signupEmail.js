const { transport, makeANiceEmail } = require("../mail");

const signupEmail = async function({ toEmail, ctx, user, confirmEmailToken }) {
  console.log("DO WE HAVE PROCESS.env", process.env.MAIL_USER);

  return transport.sendMail({
    from: process.env.MAIL_USER,
    to: toEmail,
    subject: `Welcome to Rehouser`,
    html: makeANiceEmail(
      `
<div style="line-height: 18px;">
  Thank you for Signing up to our platform.

  Please click on the below link which will confirm your email address

  <a href="${process.env.FRONTEND_URL}/confirm-account?token=${confirmEmailToken}">Click here to confirm your rehouser account</a>
</div>
<div style="line-height: 18px;">
  Alternatively you can copy paste the token <span>${confirmEmailToken}</span>
</div>
  \n\n`,
      user
    )
  });
};

module.exports = signupEmail;
