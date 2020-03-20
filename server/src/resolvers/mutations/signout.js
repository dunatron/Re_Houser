const { JWT_TOKEN_MAX_AGE } = require("../../const");

async function signout(parent, args, ctx, info) {
  ctx.response.clearCookie("token", {
    sameSite: "None",
    secure: true
  });
  ctx.response.clearCookie("refresh-token", {
    sameSite: "None",
    secure: true
  });
  return { message: "Goodbye!" };
}

module.exports = signout;
