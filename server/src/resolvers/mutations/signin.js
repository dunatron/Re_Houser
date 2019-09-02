const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function signin(parent, { email, password }, ctx, info) {
  // 1. check if there is a user with that email
  const user = await ctx.db.query.user({ where: { email } });
  if (!user) {
    throw new Error(`No such user found for email ${email}`);
  }
  // 2. Check if their password is correct
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error("Invalid Password!");
  }
  // 3. generate the JWT Token
  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
  // 4. Set the cookie with the token
  ctx.response.cookie("token", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365
  });
  // 5. Return the user
  return user;
}

module.exports = signin;
