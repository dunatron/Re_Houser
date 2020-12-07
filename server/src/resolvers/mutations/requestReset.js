const { randomBytes } = require("crypto");
const { promisify } = require("util");
const { transport, makeANiceEmail } = require("../../lib/mail");

async function requestReset(parent, args, ctx, info) {
  // 1. Check if this is a real user
  const user = await ctx.db.query.user({ where: { email: args.email } });
  if (!user) {
    throw new Error(`No such user found for email ${args.email}`);
  }
  // 2. Set a reset token and expiry on that user
  const randomBytesPromiseified = promisify(randomBytes);
  const resetToken = (await randomBytesPromiseified(20)).toString("hex");
  const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now
  const res = await ctx.db.mutation.updateUser({
    where: { email: args.email },
    data: { resetToken, resetTokenExpiry }
  });
  // 3. Email them that reset token
  const mailRes = await transport.sendMail({
    from: process.env.MAIL_USER,
    to: user.email,
    subject: "Your Password Reset Token",
    html: makeANiceEmail(
      `Your Password Reset Token is here!
      \n\n
      <a href="${process.env.FRONTEND_URL}/reset/password/${resetToken}">Click Here to Reset</a>`,
      res
    )
  });

  // 4. Return the message
  return { message: "Thanks!" };
}

module.exports = requestReset;
