const { transport, makeANiceEmail } = require("../mail");
const { CEO_DETAILS } = require("../../const");

const requestAppraisalEmail = async function({ toEmail, ctx, user }) {
  transport.sendMail({
    from: process.env.MAIL_USER,
    to: toEmail,
    subject: `Appraisal recieved`,
    html: makeANiceEmail(
      `
<div style="line-height: 18px;">
  Thank you for requesting a rental appraisal. We will do our best to provide you with an accurate based on our resources and the information you have provided. We may need to visit the property to increase the accuracy of this. I will be in touch with you to discuss this further if necessary.
</div>
<div style="line-height: 18px;">
In the meantime if you have any questions please do not hesitate to contact me via email at ${CEO_DETAILS.email} or phone on  ${CEO_DETAILS.phone}.
</div>
    \n\n`,
      user
    )
  });
};

module.exports = requestAppraisalEmail;
