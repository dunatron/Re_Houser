async function activities(parent, args, ctx, info) {
  return ctx.db.query.activities(
    {
      ...args
    },
    info
  );
}

module.exports = activities;
