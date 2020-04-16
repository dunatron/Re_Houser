const { transport, makeANiceEmail } = require("../mail");

const updatePropertyLeaseEmail = async function({ toEmail, appraisal, ctx }) {
  console.log();
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

  transport.sendMail({
    from: process.env.MAIL_USER,
    to: toEmail,
    subject: `Property has been appraised for ${location}`,
    html: makeANiceEmail(`We have appraised the property at a weekly rent of $${rent}! \n
    You can create a property at the following link <a href="${process.env.EMAIL_PREFIX}/properties/add?eData=${strJSON}">add Property</a> \n
    It will prefill in the information with the appraised information. You can always edit this information
  \n\n`)
    // html: makeANiceEmail(`We have appraised the property at a weekly rent of $${rent}! \n
    //   You can create a property at the following link ${process.env.EMAIL_PREFIX}/properties/add?eData=${strJSON} \n
    //   It will prefill in the information with the appraised information. You can always edit this information
    // \n\n`)
  });
};

module.exports = updatePropertyLeaseEmail;
