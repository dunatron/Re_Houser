const { JWT_TOKEN_MAX_AGE, rehouserCookieOpt } = require("../../const");

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

async function signout(parent, args, ctx, info) {
  const cookieOptions = rehouserCookieOpt();
  ctx.response.clearCookie("token", {
    ...cookieOptions
  });
  ctx.response.clearCookie("refresh-token", {
    ...cookieOptions
  });

  // await wait(5000);

  return { message: "Goodbye!" };
}

module.exports = signout;
