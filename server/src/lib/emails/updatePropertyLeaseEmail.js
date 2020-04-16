const { transport, makeANiceEmail } = require("../mail");

const updatePropertyLeaseEmail = async function({ toEmail, lease, ctx }) {
  transport.sendMail({
    from: process.env.MAIL_USER,
    to: toEmail,
    subject: `Lease updated and unsigned: ${lease.id}`,
    html: makeANiceEmail(`The lease has been updated and all parties have been un-signed Please head to the lease and review it and sign! \n
      You can review the updated lease at ${process.env.EMAIL_PREFIX}/leases/lease?id=${lease.id} \n
    \n\n`)
  });
};

module.exports = updatePropertyLeaseEmail;
