const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validateRecaptcha } = require("../../lib/recaptchaApi");
const { createActivity } = require("../../lib/createActivity");
const { createTokens } = require("../../auth");
const { JWT_TOKEN_MAX_AGE, rehouserCookieOpt } = require("../../const");
const signupEmail = require("../../lib/emails/signupEmail");
const emailCEO = require("../../lib/emails/emailCEO");
const signin = require("./signin");
const { promisify } = require("util");
const { randomBytes } = require("crypto");

const { addUserSearchNode } = require("../../lib/algolia/userSearchApi");
// const logUser = require("../../lib/logUser");

async function signup(parent, args, ctx, info) {
  args.email = args.email.toLowerCase();

  // little busines logic here. if they have this email and pass match just logem in
  const userMaybeFromDb = await ctx.db.query.user({
    where: {
      email: args.email,
    },
  });

  // NEEDS TO HAPPEN AFTER CHECK FOR SIGNIN AS IT POTENTIALLY HANDLES IT
  //lowercase their email
  if (!userMaybeFromDb) {
    await validateRecaptcha({
      ctx,
      captchaToken: args.captchaToken,
    });
  }

  if (userMaybeFromDb) {
    return signin(parent, args, ctx, info);
  }

  // delete this now as it is not part creating a user
  delete args.captchaToken;

  // hash their password. 1 way so if you goy hold of the hashed pass you could not turn it back to what the user actually typed
  const password = await bcrypt.hash(args.password, 10);

  const randomBytesPromiseified = promisify(randomBytes);
  const confirmEmailToken = (await randomBytesPromiseified(20)).toString("hex");

  const confirmEmailTokenExpiry = Date.now() + 3600000; // 1 hour from now

  // create the user in the database
  const user = await ctx.db.mutation.createUser(
    {
      data: {
        ...args,
        password,
        permissions: { set: ["USER"] },
        adminSettings: { create: {} },
        confirmEmailToken: confirmEmailToken,
        confirmEmailTokenExpiry: confirmEmailTokenExpiry,
      },
    },
    info
  );

  // We should use Algolia for users too
  addUserSearchNode({
    userId: user.id,
    db: ctx.db,
  });

  const { token, refreshToken } = await createTokens(user, password);
  const cookieOptions = rehouserCookieOpt();

  ctx.response.cookie("token", token, {
    ...cookieOptions,
  });
  ctx.response.cookie("refresh-token", refreshToken, {
    ...cookieOptions,
  });
  // Finalllllly we return the user to the browser
  createActivity({
    ctx: ctx,
    data: {
      title: "Signed Up!",
      content: "Congratulations you are now signed up to the platform",
      type: "SIGNED_UP",
      jsonObj: user,
      user: {
        connect: {
          id: user.id,
        },
      },
      involved: {
        connect: [
          {
            email: user.email,
          },
        ],
      },
    },
  });
  // send the new signupEmail
  signupEmail({
    toEmail: user.email,
    user: user,
    confirmEmailToken: confirmEmailToken,
  });

  emailCEO({
    ctx: ctx,
    subject: `New signup ${user.email}`,
    body: `a new user has signed up to our platform ${user.email} - firstName: ${user.firstName} - lastName: ${user.lastName} - Phone: ${user.phone}`,
  });

  const userInfoWithToken = {
    ...user,
    token: token,
    refreshToken: refreshToken,
  };
  // logUser("User Signed up", userInfoWithToken);

  return userInfoWithToken;
}

module.exports = signup;
