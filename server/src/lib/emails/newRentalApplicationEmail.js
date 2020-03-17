const { transport, makeANiceEmail } = require("../mail");

const newRentalApplicationEmail = async function({
  toEmail,
  rentalApplication,
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
    subject: `New Rental Application ID:${id}`,
    html: makeANiceEmail(`A new RentalApplication has been created for Property: ${property.location} \n
      You can complete the application at ${process.env.FRONTEND_URL}/applications/application?id=${id} \n
      The specific property you have applied for can be found at ${process.env.FRONTEND_URL}/find/property?id=${property.id} \n
      The visibility is currently set to ${visibility} \n
      Good luck with your application
    \n\n`)
  });
};

module.exports = newRentalApplicationEmail;