async function createPayment(parent, args, ctx, info) {
  const payment = await ctx.db.mutation.createPayment(
    {
      ...args
    },
    info
  );

  return payment;
}

module.exports = createPayment;
