const { transport, makeANiceEmail } = require("../mail");
const { CEO_DETAILS } = require("../../const");

const requestAppraisalEmail = async function({
  toEmail,
  user,
  location,
  appraisal
}) {
  return transport.sendMail({
    from: process.env.MAIL_USER,
    to: toEmail,
    subject: `Appraisal recieved for ${location}`,
    html: makeANiceEmail(
      `
<div style="line-height: 18px; margin-top: 16px;">
  Thank you for requesting a rental appraisal. We will be in contact shortly with an accurate assessment based on the information you have provided.
</div>

<div style="line-height: 18px; margin-top: 16px;">
In the meantime if you have any questions please do not hesitate to contact me via email at ${CEO_DETAILS.email} or phone on  ${CEO_DETAILS.phone}.
</div>

<div style="line-height: 18px;">
We may need to visit the property to increase the accuracy of this. I will be in touch with you to discuss this further if necessary.
</div>

<div style="line-height: 18px;">
We will contact you via email when this appraisal has been completed. It can also be found on the system here \n
<a href="${process.env.FRONTEND_URL}/landlord/appraisals/${appraisal.id}">Your Appraisal for ${location}</a> \n
</div>

<div style="line-height: 18px;">
A list of your Appraisals on the platform can be fround here \n
<a href="${process.env.FRONTEND_URL}/landlord/appraisals">${process.env.FRONTEND_URL}/landlord/appraisals ${location}</a> \n
</div>
    \n\n`,
      user
    )
  });
};

module.exports = requestAppraisalEmail;
