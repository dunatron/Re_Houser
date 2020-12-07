const { transport, makeANiceEmail } = require("../mail");

const _leaseLink = (leaseId, baseLink) =>
  `<a href="${process.env.FRONTEND_URL}/${baseLink}/leases/${leaseId}">To the Lease</a>`;

const newLeaseLesseeEmail = async function({
  toEmail,
  lease,
  payment,
  ctx,
  type,
  user
}) {
  const leaseLink = _leaseLink(lease.id, "tenant");
  transport.sendMail({
    // from: process.env.MAIL_USER,
    from: {
      name: "Rehouser Lease Offer",
      address: process.env.MAIL_USER
    },
    to: toEmail,
    subject: `New Lease: ${lease.id} Signage Required`,
    html: makeANiceEmail(
      `Congratulations you have been offered a new lease. Follow the link to accept the lease! ${leaseLink} \n
      All Lessees and Lessors must sign the lease and then it must be finalised by a Lessor to go into effect. \n 
      If something changes on the lease like the rent, everyone will become unsigned if the lease has not been finalised.
      \n\n`,
      user
    )
  });
};
const newLeaseLessorEmail = async function({
  toEmail,
  lease,
  payment,
  ctx,
  type,
  user
}) {
  const leaseLink = _leaseLink(lease.id, "landlord");
  return transport.sendMail({
    from: process.env.MAIL_USER,
    to: toEmail,
    subject: `New Lease: ${lease.id} Signage Required`,
    html: makeANiceEmail(
      `The application for your property has been accepted! \n 
      As a Lessor you need to head on over to the lease to sign it ${leaseLink} \n
      Once all the Lessees and Lessors for the lease have signed the lease, A Lessor must click the "FINALISE" lease button found at the top of the Lease Signage area
      \n\n`,
      user
    )
  });
};

module.exports = {
  newLeaseLesseeEmail,
  newLeaseLessorEmail
};
