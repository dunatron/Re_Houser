const nodemailer = require("nodemailer");
const moment = require("moment");
const { CEO_DETAILS } = require("../../const");

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

const makeANiceEmail = (text, user) => {
  var today = moment().format("dddd, MMMM Do YYYY");
  return `
  <div className="email" style="
    border: 1px solid black;
    border: 1px solid #e91e63;
    padding: 20px;
    font-family: sans-serif;
    line-height: 2;
    font-size: 16px;
  ">
    <!-- heading -->
    <h2 style="border-bottom: 3px solid black; border-bottom: 3px solid #e91e63; font-size: 26px">Rehouser Property Management Ltd</h2>
    <!-- adress details -->
    <div style="font-size: 12px; line-height: 18px;">
      <div>Rehouser</div>
      <div>${CEO_DETAILS.phone}</div>
      <div${CEO_DETAILS.email}</div>
    </div>
    <!-- date -->
    <div style="margin: 16px 0;">${today}</div>
    <!-- dear -->
    <div style="margin-bottom: 16px;">To ${user.firstName} ${user.lastName}</div>
    <!-- content/text -->
    ${text}
    <!-- regards -->
    <div style="margin-top: 32px; line-height: 22px;">
      <div style="margin-bottom: 32px;">
         With Kind Regards,
      </div>
      <div>
        ${CEO_DETAILS.firstname} ${CEO_DETAILS.lastname}
      </div>
      <div>
        Rehouser Property Manager
      </div>
      <div>
        ${CEO_DETAILS.phone}
      </div>
    </div>
  </div>
  `;
};

exports.transport = transport;
exports.makeANiceEmail = makeANiceEmail;
