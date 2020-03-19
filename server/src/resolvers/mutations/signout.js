const { JWT_TOKEN_MAX_AGE, rehouserCookieOpt } = require("../../const");

async function signout(parent, args, ctx, info) {
  ctx.response.clearCookie("token", {
    ...rehouserCookieOpt
  });
  ctx.response.clearCookie("refresh-token", {
    ...rehouserCookieOpt
  });
  return { message: "Goodbye!" };
}

module.exports = signout;
