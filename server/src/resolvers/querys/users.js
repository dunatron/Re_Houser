async function users(parent, args, ctx, info) {
  return ctx.db.query.users(
    {
      ...args
    },
    info
  );
}

module.exports = users;
