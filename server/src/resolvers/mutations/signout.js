async function signout(parent, args, ctx, info) {
  ctx.response.clearCookie("token");
  ctx.response.clearCookie("refresh-token");
  return { message: "Goodbye!" };
}

module.exports = signout;
