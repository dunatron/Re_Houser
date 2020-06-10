const { transport, makeANiceEmail } = require("../mail");

const requestAppraisalEmail = async function({ toEmail, ctx, user }) {
  transport.sendMail({
    from: process.env.MAIL_USER,
    to: toEmail,
    subject: `Appraisal recieved`,
    html: makeANiceEmail(
      `
<div style="line-height: 18px;">
    Thank you for giving us the opportunity to provide you with a professional rental appraisal for your property.
</div>
<div style="line-height: 18px;">
    we will get back to you as soon as we have been able to accurately assess your property relative to the market
</div>
    \n\n`,
      user
    ),
  });
};

module.exports = requestAppraisalEmail;
