const { transport, makeANiceEmail } = require("../mail");

const offerRentalAppraisalEmail = async function({
  toEmail,
  appraisal,
  ctx,
  user
}) {
  console.log();
  const {
    id,
    requestedBy: { email, firstName },
    location,
    rooms,
    bathrooms,
    heatSources,
    rent,
    lowRent,
    highRent,
    rentValueAccepted
  } = appraisal;

  const strJSON = encodeURIComponent(JSON.stringify(appraisal));

  // We have appraised the property at a weekly rent of $${rent}! \n
  //   You can create a property at the following link <a href="${process.env.EMAIL_PREFIX}/properties/add?eData=${strJSON}">add Property</a> \n
  //   It will prefill in the information with the appraised information. You can always edit this information

  transport.sendMail({
    from: process.env.MAIL_USER,
    to: toEmail,
    subject: `Property has been appraised for ${location}`,
    html: makeANiceEmail(
      `
<div style="line-height: 18px;">
    Thank you for giving us the opportunity to provide you with a professional rental appraisal for your property.
</div>
<div style="line-height: 18px; margin-top: 16px;">
  After considering your property and the current rental market conditions we would be able to secure a weekly
  rent between $${lowRent} - $${highRent}. This amount has been based on similar properties within the vicinity of your property.
</div>

<div style="line-height: 18px; margin-top: 16px;">
  We would be grateful for the opportunity to Let and Manage your property with support of our platform <a href="${process.env.EMAIL_PREFIX}">Rehouser</a>
</div>
<div style="line-height: 18px; margin-top: 16px;">
To review our terms and conditions and to continue adding your property please go <a href="${process.env.EMAIL_PREFIX}/info/terms">here</a>
</div>
<div style="line-height: 18px; margin-top: 16px;">
  If you have any questions do not hesitate to give me a call.
</div>
  \n\n`,
      user
    )
    // html: makeANiceEmail(`We have appraised the property at a weekly rent of $${rent}! \n
    //   You can create a property at the following link ${process.env.EMAIL_PREFIX}/properties/add?eData=${strJSON} \n
    //   It will prefill in the information with the appraised information. You can always edit this information
    // \n\n`)
  });
};

module.exports = offerRentalAppraisalEmail;
