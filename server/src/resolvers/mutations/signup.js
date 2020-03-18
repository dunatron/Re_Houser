const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validateRecaptcha } = require("../../lib/recaptchaApi");
const { createActivity } = require("../../lib/createActivity");

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
  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
  // We set the jwt as a cookie on the response
  ctx.response.cookie("token", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
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
      }
    }
  });
  return user;
}

module.exports = signup;
