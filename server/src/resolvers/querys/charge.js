async function charge(parent, args, ctx, info) {
  return ctx.db.query.charge(
    {
      ...args
    },
    info
  );
}

module.exports = charge;
