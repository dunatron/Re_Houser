const nodemailer = require("nodemailer")

// const transport = nodemailer.createTransport({
//   host: process.env.MAIL_HOST,
//   port: process.env.MAIL_PORT,
//   auth: {
//     user: process.env.MAIL_USER,
//     pass: process.env.MAIL_PASS,
//   },
// })

// const transport = nodemailer.createTransport({
//   // host: "gmail",
//   service: "gmail",
//   // port: process.env.MAIL_PORT,
//   auth: {
//     user: "heath.dunlop.hd@gmail.com",
//     pass: "DDHDB@$92Dunlop24",
//   },
// })

const transport = nodemailer.createTransport({
  // host: "gmail",
  service: "gmail",
  host: "gmail",
  // port: process.env.MAIL_PORT,
  // host: "smtp.gmail.com",
  // port: 465,
  // secure: true,
  auth: {
    user: "heathd@rehouser.co.nz",
    pass: "DDHDB@$92Dunlop24",
  },
  // tls: {
  //   // do not fail on invalid certs
  //   rejectUnauthorized: false,
  // },
})

// host: 'smtp.gmail.com',
//     port: 465,
//     secure: true,
//     auth: {
//         user: 'youremai@gmail.com', // Your email id
//         pass: 'pwd123' // Your password
//     },
//     tls: {
//         // do not fail on invalid certs
//         rejectUnauthorized: false
//     }

//

//

//

// MAIL_HOST="gmail"
// MAIL_PORT=""
// MAIL_USER="heath.dunlop.hd@gmail.com"
// MAIL_PASS="DDHDB@$92Dunlop24"

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
`

exports.transport = transport
exports.makeANiceEmail = makeANiceEmail
