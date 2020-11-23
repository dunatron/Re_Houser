const { randomBytes } = require("crypto");
const { promisify } = require("util");
const { transport, makeANiceEmail } = require("../../lib/mail");
const congratulateEmailConfirmEmail = require("../../lib/emails/congratulateEmailConfirmEmail");
const createChat = require("./createChat");
const { CEO_DETAILS, CTO_DETAILS } = require("../../const");
// const logUser = require("../../lib/logUser");

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
        id: loggedInUserId
      }
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
        confirmEmailTokenExpiry_gte: Date.now() - 3600000
      }
    },
    info
  );

  if (!user) {
    throw new Error("This token is either invalid or expired!");
  }

  if (!user.email) {
    throw new Error("LOL IT does not have an email!");
  }

  // if (user.emailValidated) {
  //   throw new Error("You have already validated this emails account");
  // }

  // confirm the token is leget
  // make mutation to say
  const updatedUserRes = await ctx.db.mutation.updateUser(
    {
      where: { email: user.email },
      data: {
        emailValidated: true,
        confirmEmailToken: null,
        confirmEmailTokenExpiry: null
      }
    },
    info
  );
  // 3. Email them congratulations on confirming email

  congratulateEmailConfirmEmail({
    email: user.email,
    user: user
  });

  //create a chat betwen user and admin
  if (user.email !== "admin@rehouser.co.nz") {
    const theChat = await createChat(
      parent,
      {
        data: {
          type: "GROUP",
          name: "Rehouser Admin",
          participants: {
            connect: [
              {
                id: user.id
              },
              {
                id: CEO_DETAILS.id
              }
            ]
          },
          messages: {
            create: {
              isMine: false,
              content: "Welcome to rehouser",
              sender: {
                connect: {
                  id: CEO_DETAILS.id
                }
              }
            }
          }
        }
      },
      ctx,
      info
    );
    console.log("CHAT CREATED FORM CONFIRM EMAIL => ", theChat);
  }

  // logUser("User confirmed email", updatedUserRes);

  // 4. Return the message
  return updatedUserRes;
}

module.exports = confirmEmail;
