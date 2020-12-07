const { randomBytes } = require("crypto");
const { promisify } = require("util");
const { transport, makeANiceEmail } = require("../../lib/mail");
const moment = require("moment");

async function resendConfirmEmail(parent, args, ctx, info) {
  // throw new Error("Sorry business logic and security, needs to be 100");
  // 1. Check if this is a real user0
  const loggedInUserId = ctx.request.userId;

  if (!loggedInUserId) {
    throw new Error("You must be logged in!");
  }
  const user = await ctx.db.query.user({ where: { id: loggedInUserId } });
  if (!user) {
    throw new Error(`No such user found for id ${loggedInUserId}`);
  }
  // 2. Set a reset token and expiry on that user
  const randomBytesPromiseified = promisify(randomBytes);
  const confirmEmailToken = (await randomBytesPromiseified(20)).toString("hex");

  const confirmEmailTokenExpiry = Date.now() + 3600000; // 1 hour from now

  // note we dont want to expose these tokens, they must come through email
  const res = await ctx.db.mutation.updateUser({
    where: { email: user.email },
    data: {
      confirmEmailToken: confirmEmailToken,
      confirmEmailTokenExpiry: confirmEmailTokenExpiry
    }
  });

  // 3. Email them that reset token
  // const mailRes = await dont really need to wait
  transport.sendMail({
    // from: "heath.dunlop.hd@gmail.com",
    // to: user.email,
    from: process.env.MAIL_USER,
    to: user.email,
    subject: "Your Password Reset Token",
    html: makeANiceEmail(
      `Rehouser confirm account!
      \n\n
      <a href="${
        process.env.FRONTEND_URL
      }/account/confirm/${confirmEmailToken}">Click Here to confirm your rehouser account</a>
      <div style="line-height: 18px;">
        Alternatively you can copy paste the token <span>${confirmEmailToken}</span>
      </div>
      <div>The token will expire at ${moment(confirmEmailTokenExpiry).format(
        "h:mm:ss a ddd, MMM Do YYYY, "
      )}</div>
      `,
      user
    )
  });

  // 4. Return the message
  return user;
}

module.exports = resendConfirmEmail;
