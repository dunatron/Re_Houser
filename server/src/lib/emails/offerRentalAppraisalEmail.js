const { transport, makeANiceEmail } = require("../mail");

const offerRentalAppraisalEmail = async function({
  toEmail,
  appraisal,
  ctx,
  user
}) {
  const {
    id,
    requestedBy: { email, firstName },
    location,
    rooms,
    bathrooms,
    heatSources,
    rent,
    rentValueAccepted
  } = appraisal;

  const strJSON = encodeURIComponent(JSON.stringify(appraisal));

  // We have appraised the property at a weekly rent of $${rent}! \n
  //   You can create a property at the following link <a href="${process.env.EMAIL_PREFIX}/properties/add?eData=${strJSON}">add Property</a> \n
  //   It will prefill in the information with the appraised information. You can always edit this information

  return transport.sendMail({
    // from: process.env.MAIL_USER,
    from: {
      name: "Rehouser Property Appraised",
      address: process.env.MAIL_USER
    },
    to: toEmail,
    subject: `Property has been appraised for ${location}`,
    html: makeANiceEmail(
      `
<div style="line-height: 18px;">
    Thank you for giving us the opportunity to provide you with a professional rental appraisal for your property.
</div>
<div style="line-height: 18px; margin-top: 16px;">
  After considering your property and the current rental market conditions we would be able to secure a weekly
  rent of $${rent}. This amount has been based on similar properties within the vicinity of your property. \n
  You can begin adding this property to the platform by clicking the below link 
  <a href="${process.env.FRONTEND_URL}/landlord/properties/add?appraisal_id=${appraisal.id}">add Property</a> \n
</div>

<div style="line-height: 18px; margin-top: 16px;">
  We would be grateful for the opportunity to Let and Manage your property with support of our platform <a href="${process.env.FRONTEND_URL}">Rehouser</a>
</div>
<div style="line-height: 18px; margin-top: 16px;">
  You can review our terms and conditions here at the landlord portal.<a href="${process.env.FRONTEND_URL}/landlord/terms-of-engagement">Landlord Portal Terms of engagement</a>
</div>
<div style="line-height: 18px; margin-top: 16px;">
  <a href="${process.env.FRONTEND_URL}/landlord/properties/add?appraisal_id=${appraisal.id}">Begin adding property based on appraisal</a> \n
</div>
<div style="line-height: 18px; margin-top: 16px;">
  If you have any questions do not hesitate to give me a call.
</div>
  \n\n`,
      user
    )
  });
};

module.exports = offerRentalAppraisalEmail;
