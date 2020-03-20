async function payments(parent, args, ctx, info) {
  return ctx.db.query.payments({
    ...args
  });
}

module.exports = payments;
