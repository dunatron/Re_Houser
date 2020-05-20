const { transport, makeANiceEmail } = require("../mail");

const finalisePropertyLeaseEmail = async function({
  toEmail,
  lease,
  // payment,
  wallet,
  ctx,
}) {
  transport.sendMail({
    from: process.env.MAIL_USER,
    to: toEmail,
    subject: `Lease Accepted and Signed: ${lease.id}`,
    html: makeANiceEmail(`Congratulations the lease has now been signed and is in full effect! \n
      The Lease wallet has ($${wallet.amount}) \n
      Head on over to the lease to view the details and manage the thing ${process.env.EMAIL_PREFIX}/leases/lease?id=${lease.id} \n
    \n\n`),
  });
};

module.exports = finalisePropertyLeaseEmail;
