async function activity(parent, args, ctx, info) {
  const requestedActivity = await ctx.db.query.activity(
    {
      ...args
    },
    info
  );
  return requestedActivity;
}

module.exports = activity;
