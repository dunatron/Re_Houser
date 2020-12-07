const { transport, makeANiceEmail } = require("../mail");

const newRentalApplicationEmail = async function({
  toEmail,
  rentalApplication,
  applicantId,
  ctx,
  user
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

  return transport.sendMail({
    // from: process.env.MAIL_USER,
    from: {
      name: "Rehouser Application Applicant",
      address: process.env.MAIL_USER
    },
    to: toEmail,
    subject: `New Applicant: ${applicantId} for RentalApplication`,
    html: makeANiceEmail(
      `A new Applicant has applied against your RentalApplication for Property: ${property.location} \n
      You can approve them for your application at ${process.env.FRONTEND_URL}/tenant/applications/${id} \n
      The applictaion visibility is currently set to ${visibility} \n
      Good luck with your application
    \n\n`,
      user
    )
  });
};

module.exports = newRentalApplicationEmail;
