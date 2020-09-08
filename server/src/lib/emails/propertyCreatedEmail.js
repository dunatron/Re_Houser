const { transport, makeANiceEmail } = require("../mail");

const propertyCreatedEmail = async function({ toEmail, appraisal, ctx, user }) {
  return transport.sendMail({
    from: process.env.MAIL_USER,
    to: toEmail,
    subject: `A new Property has been added`,
    html: makeANiceEmail(
      `
<div style="line-height: 18px;">
    Oi Frodo a new Property has been added to the system. Its a lead...
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

module.exports = propertyCreatedEmail;
