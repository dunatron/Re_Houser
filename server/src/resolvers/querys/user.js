async function user(parent, args, ctx, info) {
  return ctx.db.query.user(
    {
      ...args
    },
    info
  );
}

module.exports = user;
