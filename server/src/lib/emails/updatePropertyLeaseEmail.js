const { transport, makeANiceEmail } = require("../mail");

const updatePropertyLeaseEmail = async function({
  baseLink,
  toEmail,
  lease,
  ctx,
  user
}) {
  return transport.sendMail({
    // from: process.env.MAIL_USER,
    from: {
      name: "Rehouser Lease Change",
      address: process.env.MAIL_USER
    },
    to: toEmail,
    subject: `Lease updated and unsigned: ${lease.id}`,
    html: makeANiceEmail(
      `The lease has been updated and all parties have been un-signed Please head to the lease and review it and sign! \n
      You can review the updated lease at ${process.env.FRONTEND_URL}/${baseLink}/leases/${lease.id} \n
    \n\n`,
      user
    )
  });
};

module.exports = updatePropertyLeaseEmail;
