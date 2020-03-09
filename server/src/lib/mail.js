const nodemailer = require("nodemailer");

// https://my.sendinblue.com/users/settings
const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER, // replace with your Mailtrap credentials
    pass: process.env.MAIL_PASS
  },
  debug: true, // show debug output
  logger: true // log information in console
});

const makeANiceEmail = text => `
  <div className="email" style="
    border: 1px solid black;
    padding: 20px;
    font-family: sans-serif;
    line-height: 2;
    font-size: 20px;
  ">
    <h2>Hello There!</h2>
    <p>${text}</p>
    <p>😘, Dunatron</p>
  </div>
`;

exports.transport = transport;
exports.makeANiceEmail = makeANiceEmail;
