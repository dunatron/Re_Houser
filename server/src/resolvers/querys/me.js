const logger = require("../../middleware/loggers/logger");

async function me(parent, args, ctx, info) {
  // const currentUser = await ctx.db.query.user(
  //   {
  //     where: { id: "rehouser-cto-id" }
  //   },
  //   info
  // );
  // return currentUser;

  logger.log("info", `ME QUERY HEADERS`, {
    headers: ctx.request.headers,
  });

  if (!ctx.request.userId) {
    return null;
    // return null;
  }
  const currentUser = await ctx.db.query.user(
    {
      where: { id: ctx.request.userId },
    },
    info
  );
  return currentUser;
}

module.exports = me;
