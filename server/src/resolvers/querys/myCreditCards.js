async function myCreditCards(parent, args, ctx, info) {
  if (!ctx.request.userId) {
    throw new Error("You must be logged in to get your credit cards!");
  }
  const userId = ctx.request.userId;
  return ctx.db.query.creditCards(
    {
      where: {
        cardOwner: {
          id: userId,
        },
      },
    },
    info
  );
}

module.exports = myCreditCards;
