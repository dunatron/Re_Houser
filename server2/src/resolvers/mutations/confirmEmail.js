const { randomBytes } = require("crypto");
const { promisify } = require("util");
const { transport, makeANiceEmail } = require("../../lib/mail");

/**
 *
 * 1. accept tolen & EMAIL from mutation
 * 2. validate it etc and assign validated
 * 3. remember on client to accept a pub when opn login page for a confirm emailAddress
 *
 *
 * @param {*} parent
 * @param {*} args
 * @param {*} ctx
 * @param {*} info
 */
async function confirmEmail(parent, args, ctx, info) {
  // 1. Check if this is a real user
  const loggedInUserId = ctx.request.userId;

  if (!loggedInUserId) {
    throw new Error("You must be logged in to confirm your email!");
  }

  const loggedInUser = await ctx.db.query.user(
    {
      where: {
        id: loggedInUserId,
      },
    },
    info
  );

  if (loggedInUser.emailValidated) {
    throw new Error(
      `Account email has already been validated: ${loggedInUser.email}!`
    );
  }

  const [user] = await ctx.db.query.users(
    {
      where: {
        email: loggedInUser.email,
        confirmEmailToken: args.token,
        confirmEmailTokenExpiry_gte: Date.now() - 3600000,
      },
    },
    info
  );

  if (!user) {
    throw new Error("This token is either invalid or expired!");
  }

  if (user.emailValidated) {
    throw new Error("You have already validated this emails account");
  }

  // confirm the token is leget
  // make mutation to say
  const res = await ctx.db.mutation.updateUser(
    {
      where: { email: user.email },
      data: {
        emailValidated: true,
        confirmEmailToken: null,
        confirmEmailTokenExpiry: null,
      },
    },
    info
  );
  // 3. Email them that reset token
  const mailRes = await transport.sendMail({
    from: "heath.dunlop.hd@gmail.com",
    to: user.email,
    subject: "Rehouser account validated",
    html: makeANiceEmail(
      `Congratulations on validating your email!
      \n\n`,
      user
    ),
  });

  // 4. Return the message
  return res;
}

module.exports = confirmEmail;
