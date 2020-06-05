async function payment(parent, args, ctx, info) {
  return ctx.db.query.payment({
    ...args
  });
}

module.exports = payment;
