const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function signup(parent, args, ctx, info) {
  //lowercase their email
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
  return user;
}

module.exports = signup;
