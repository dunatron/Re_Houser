const { JWT_TOKEN_MAX_AGE, rehouserCookieOpt } = require("../../const");

async function signout(parent, args, ctx, info) {
  const cookieOptions = rehouserCookieOpt();
  ctx.response.clearCookie("token", {
    ...cookieOptions
  });
  ctx.response.clearCookie("refresh-token", {
    ...cookieOptions
  });
  return { message: "Goodbye!" };
}

module.exports = signout;
