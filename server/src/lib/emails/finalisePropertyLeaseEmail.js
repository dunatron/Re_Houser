const { transport, makeANiceEmail } = require("../mail");

const finalisePropertyLeaseEmail = async function({
  toEmail,
  lease,
  payment,
  ctx
}) {
  transport.sendMail({
    from: process.env.MAIL_USER,
    to: toEmail,
    subject: `Lease Accepted and Signed: ${lease.id}`,
    html: makeANiceEmail(`Congratulations the lease has now been signed and is in full effect. You were charged ${payment.amount} for the successful signing! \n
      Head on over to the lease to view the details and manage the thing ${process.env.FRONTEND_URL}/leases/lease?id=${lease.id} \n
    \n\n`)
  });
};

module.exports = finalisePropertyLeaseEmail;
