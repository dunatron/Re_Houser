const { transport, makeANiceEmail } = require("../mail");
const { CEO_DETAILS } = require("../../const");

const emailCEO = async function({ ctx, subject, body }) {
  return transport.sendMail({
    from: process.env.MAIL_USER,
    to: CEO_DETAILS.email,
    subject: subject,
    html: makeANiceEmail(body, {
      firstName: CEO_DETAILS.firstname,
      lastName: CEO_DETAILS.lastname
    })
  });
};

module.exports = emailCEO;
