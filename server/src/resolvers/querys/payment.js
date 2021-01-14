async function payment(parent, args, ctx, info) {
  return ctx.db.query.payment(
    {
      ...args
    },
    info
  );
}

module.exports = payment;
