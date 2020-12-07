const { transport, makeANiceEmail } = require("../mail");

const propertyCreatedEmail = async function({ toEmail, appraisal, ctx, user }) {
  return transport.sendMail({
    from: {
      name: "Rehouser Property Created",
      address: process.env.MAIL_USER
    },
    to: toEmail,
    subject: `A new Property has been added`,
    html: makeANiceEmail(
      `
<div style="line-height: 18px;">
    A new property has been created on the rehouser platform
</div>
  \n\n`,
      user
    )
  });
};

module.exports = propertyCreatedEmail;
