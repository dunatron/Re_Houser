const { transport, makeANiceEmail } = require("../mail");
const { CEO_DETAILS } = require("../../const");

const congratulateEmailConfirmEmail = async function({ email, user }) {
  return transport.sendMail({
    from: process.env.MAIL_USER,
    to: email,
    subject: "Rehouser account validated",
    html: makeANiceEmail(
      `Congratulations on validating your email!
        \n\n`,
      user
    )
  });
};

module.exports = congratulateEmailConfirmEmail;
