const { transport, makeANiceEmail } = require("../mail");

const signupEmail = async function({ toEmail, ctx, user }) {
  transport.sendMail({
    from: process.env.MAIL_USER,
    to: toEmail,
    subject: `Property has been appraised for ${location}`,
    html: makeANiceEmail(
      `
<div style="line-height: 18px;">
  Thank you for your interest in Rehouser Property Management Ltd. You will now have access to our fees and terms of trade.
</div>
<div style="line-height: 18px; margin-top: 16px;">
  If you would like to request a rental appraisal this can be completed through our website - <a href="${process.env.EMAIL_PREFIX}/freeappraisal">${process.env.EMAIL_PREFIX}/freeappraisal</a>
</div>
<div style="line-height: 18px; margin-top: 16px;">
  Otherwise we will be in contact with you to discuss your portfolio and your property goals.
</div>
<div style="line-height: 18px; margin-top: 16px;">
  If you would like to talk to me sooner, please give me a call on ${process.env.REHOUSER_ADMIN_PHONE} or email me at admin@rehouser.co.nz
</div>
  \n\n`,
      user
    )
  });
};

module.exports = signupEmail;
