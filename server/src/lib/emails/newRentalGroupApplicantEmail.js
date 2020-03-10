const { transport, makeANiceEmail } = require("../mail");

const newRentalApplicationEmail = async function({
  toEmail,
  rentalApplication,
  applicantId,
  ctx
}) {
  const {
    id,
    visibility,
    stage,
    finalised,
    owner,
    property,
    applicants
  } = rentalApplication;

  transport.sendMail({
    from: process.env.MAIL_USER,
    to: toEmail,
    subject: `New Applicant: ${applicantId} for RentalApplication`,
    html: makeANiceEmail(`A new Applicant has applied against your RentalApplication for Property: ${property.location} \n
      You can approve them for your application at ${process.env.FRONTEND_URL}/applications/application?id=${id} \n
      The applictaion visibility is currently set to ${visibility} \n
      Good luck with your application
    \n\n`)
  });
};

module.exports = newRentalApplicationEmail;
