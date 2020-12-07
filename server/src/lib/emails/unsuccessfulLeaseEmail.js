const { transport, makeANiceEmail } = require("../mail");

const unsuccessfulLeaseEmail = async function({ toEmail, user, property }) {
  return transport.sendMail({
    // from: process.env.MAIL_USER,
    from: {
      name: "Rehouser Unsuccessful Lease",
      address: process.env.MAIL_USER
    },
    to: toEmail,
    subject: `Usuccessful Lease for ${property.location}`,
    html: makeANiceEmail(
      `
<div style="line-height: 18px;">
  Your lease has been unsuccessful.
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

module.exports = unsuccessfulLeaseEmail;
