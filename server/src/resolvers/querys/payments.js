async function payments(parent, args, ctx, info) {
  return ctx.db.query.payments(
    {
      ...args
    },
    info
  );
}

module.exports = payments;
