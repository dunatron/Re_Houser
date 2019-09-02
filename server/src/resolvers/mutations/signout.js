async function signout(parent, args, ctx, info) {
  ctx.response.clearCookie("token");
  return { message: "Goodbye!" };
}

module.exports = signout;
