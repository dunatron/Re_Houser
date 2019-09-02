async function myCreditCards(parent, args, ctx, info) {
  // GOing to need to rethink this. Method to get applicants_some is of type RentalGroupApplicant
  if (!ctx.request.userId) {
    throw new Error("You must be logged in to get your properties!");
  }
  const userId = ctx.request.userId;
  return ctx.db.query.creditCards(
    {
      where: {
        cardOwner: {
          id: userId
        }
      }
    },
    // {},
    info
  );
}

module.exports = myCreditCards;
