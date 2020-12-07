const { transport, makeANiceEmail } = require("../mail");
const { CEO_DETAILS } = require("../../const");

const emailCEO = async function({ ctx, subject, body, from }) {
  return transport.sendMail({
    // from: process.env.MAIL_USER,
    // ToDo: emailCeo should be able to recieve the from. that way we can customize its from name
    from: from
      ? from
      : {
          name: "Rehouser CEO Email",
          address: process.env.MAIL_USER
        },
    to: CEO_DETAILS.email,
    subject: subject,
    html: makeANiceEmail(body, {
      firstName: CEO_DETAILS.firstname,
      lastName: CEO_DETAILS.lastname
    })
  });
};

module.exports = emailCEO;
