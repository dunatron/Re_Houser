const { transport, makeANiceEmail } = require("../mail");

const finalisePropertyLeaseEmail = async function({
  baseLink,
  toEmail,
  lease,
  // payment,
  wallet,
  ctx,
  user
}) {
  return transport.sendMail({
    // from: process.env.MAIL_USER,
    from: {
      name: "Rehouser Lease Finalised",
      address: process.env.MAIL_USER
    },
    to: toEmail,
    subject: `Lease Accepted and Signed: ${lease.id}`,
    html: makeANiceEmail(
      `Congratulations the lease for ${lease.property.location} has now been signed and is in full effect! \n
      The Lease wallet has ($${wallet.amount}) which includes a weekly rent charge and the bond charge. \n
      Head on over to the lease to view and manage ${process.env.EMAIL_PREFIX}/${baseLink}/leases/${lease.id} \n
    \n\n`,
      user
    )
  });
};

module.exports = finalisePropertyLeaseEmail;
