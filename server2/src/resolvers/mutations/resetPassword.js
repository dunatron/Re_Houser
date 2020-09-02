const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_TOKEN_MAX_AGE, rehouserCookieOpt } = require("../../const");
const { createTokens } = require("../../auth");

async function resetPassword(parent, args, ctx, info) {
  // 1. check if the passwords match
  if (args.password !== args.confirmPassword) {
    throw new Error("Yo Passwords don't match!");
  }
  // 2. check if its a legit reset token
  // 3. Check if its expired
  const [user] = await ctx.db.query.users({
    where: {
      resetToken: args.resetToken,
      resetTokenExpiry_gte: Date.now() - 3600000
    }
  });
  if (!user) {
    throw new Error("This token is either invalid or expired!");
  }
  // 4. Hash their new password
  const password = await bcrypt.hash(args.password, 10);
  // 5. Save the new password to the user and remove old resetToken fields
  const updatedUser = await ctx.db.mutation.updateUser({
    where: { email: user.email },
    data: {
      password,
      resetToken: null,
      resetTokenExpiry: null
    }
  });
  // 6. Generate JWT
  // const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET);
  const { token, refreshToken } = await createTokens(user, password);

  const cookieOptions = rehouserCookieOpt();
  // 7. Set the JWT cookie
  ctx.response.cookie("token", token, {
    ...cookieOptions
  });
  ctx.response.cookie("refresh-token", refreshToken, {
    ...cookieOptions
  });
  // ctx.response.cookie("token", token, {
  //   httpOnly: true,
  //   maxAge: 1000 * 60 * 60 * 24 * 365
  // });
  // 8. return the new user
  return updatedUser;
}

module.exports = resetPassword;
