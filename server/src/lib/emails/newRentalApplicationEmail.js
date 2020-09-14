const { transport, makeANiceEmail } = require("../mail");

const newRentalApplicationEmail = async function({
  toEmail,
  rentalApplication,
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
    from: process.env.MAIL_USER,
    to: toEmail,
    subject: `New Rental Application ID:${id}`,
    html: makeANiceEmail(
      `A new RentalApplication has been created for Property: ${property.location} \n
      You can complete the application at ${process.env.EMAIL_PREFIX}/tenant/applications/application?id=${id} \n
      The specific property you have applied for can be found at ${process.env.EMAIL_PREFIX}/find/property?id=${property.id} \n
      The visibility is currently set to ${visibility} \n
      Good luck with your application
    \n\n`,
      user
    )
  });
};

module.exports = newRentalApplicationEmail;
