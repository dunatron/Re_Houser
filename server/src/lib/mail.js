const nodemailer = require("nodemailer");
const moment = require("moment");
const { CEO_DETAILS } = require("../const");

// https://my.sendinblue.com/users/settings
const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_LOGIN, // replace with your Mailtrap credentials
    pass: process.env.MAIL_PASS
  },
  // debug: process.env.STAGE === "dev" ? true : false, // show debug output
  // logger: process.env.STAGE === "dev" ? true : false // log information in console
  // debug: process.env.STAGE === "prod" ? false : true, // show debug output
  // logger: process.env.STAGE === "prod" ? false : true // log information in console
  debug: false, // show debug output
  logger: false // log information in console
});

const makeANiceEmail = (text, user) => {
  var today = moment().format("dddd, MMMM Do YYYY");
  var primaryColor = "#d0a85c";
  var secondaryColor = "#002443";

  var hasName = user.firstName || user.lastName;

  var dearUserSection = hasName
    ? `<div style="margin-bottom: 16px;">
        To ${user && user.firstName} ${user && user.lastName}
      </div>`
    : "";

  return `
  <div className="email" style="
    border: 2px solid ${primaryColor};
    padding: 20px;
    font-family: sans-serif;
    line-height: 2;
    font-size: 16px;
  ">
    <!-- heading -->
    <h2 style="color: ${secondaryColor}; border-bottom: 3px solid ${primaryColor}; font-size: 26px">Rehouser Property Management Ltd</h2>
    <!-- adress details -->
    <div style="font-size: 12px; line-height: 18px;">
      <div>Rehouser</div>
      <div>${CEO_DETAILS.phone}</div>
      <div>${CEO_DETAILS.email}</div>
    </div>
    <!-- date -->
    <div style="margin: 16px 0;">${today}</div>
    <!-- dear -->
    ${dearUserSection}
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
