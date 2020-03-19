const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validateRecaptcha } = require("../../lib/recaptchaApi");
const { createActivity } = require("../../lib/createActivity");
const { createTokens } = require("../../auth");
const { JWT_TOKEN_MAX_AGE, rehouserCookieOpt } = require("../../const");

async function signup(parent, args, ctx, info) {
  //lowercase their email
  await validateRecaptcha({
    ctx,
    captchaToken: args.captchaToken
  });
  // delete this now as it is not part creating a user
  delete args.captchaToken;
  args.email = args.email.toLowerCase();
  // hash their password. 1 way so if you goy hold of the hashed pass you could not turn it back to what the user actually typed
  const password = await bcrypt.hash(args.password, 10);
  // create the user in the database
  const user = await ctx.db.mutation.createUser(
    {
      data: {
        ...args,
        password,
        permissions: { set: ["USER"] }
      }
    },
    info
  );
  // create the JWT token for them
  // const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
  // // We set the jwt as a cookie on the response
  // ctx.response.cookie("token", token, {
  //   httpOnly: true,
  //   maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
  //   sameSite: "None",
  //   Secure: true
  // });
  const { token, refreshToken } = await createTokens(user, password);

  ctx.response.cookie("token", token, {
    httpOnly: true,
    ...rehouserCookieOpt
  });
  ctx.response.cookie("refresh-token", refreshToken, {
    ...rehouserCookieOpt
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
          id: user.id
        }
      },
      involved: {
        connect: [
          {
            email: user.email
          }
        ]
      }
    }
  });

  const userInfoWithToken = {
    ...user,
    token: token,
    refreshToken: refreshToken
  };
  return userInfoWithToken;
}

module.exports = signup;
