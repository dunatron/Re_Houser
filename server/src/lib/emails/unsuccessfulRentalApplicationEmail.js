const { transport, makeANiceEmail } = require("../mail");

const unsuccessfulRentalApplicationEmail = async function({
  toEmail,
  user,
  property
}) {
  return transport.sendMail({
    // from: process.env.MAIL_USER,
    from: {
      name: "Rehouser Unsuccessful Rental Application",
      address: process.env.MAIL_USER
    },
    to: toEmail,
    subject: `A lease for ${property.location} has been signed`,
    html: makeANiceEmail(
      `
<div style="line-height: 18px;">
  Your application for ${property.location} is now going to be permamntely closed. If you made it to the lease stage you will also get an email informing you if you were successful or not
</div>
<div style="line-height: 18px; margin-top: 16px;">
  
</div>
<div style="line-height: 18px; margin-top: 16px;">

</div>
<div style="line-height: 18px; margin-top: 16px;">

</div>
  \n\n`,
      user
    )
  });
};

module.exports = unsuccessfulRentalApplicationEmail;
