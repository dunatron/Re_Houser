async function inspection(parent, args, ctx, info) {
  const requestedInspection = await ctx.db.query.inspection(
    {
      ...args
    },
    info
  );
  return requestedInspection;
}

module.exports = inspection;
