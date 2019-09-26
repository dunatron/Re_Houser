const { createCard } = require("../../lib/paymentAPI");

async function createCreditCard(parent, { token }, ctx, info) {
  // 1. Query the current user and ma ke sure they are signed in
  // const { userId } = ctx.request.userId
  // if (!userId) throw new Error("You must be signed in to create a credit card")
  const loggedInUserId = await ctx.request.userId;
  // need to be logged in
  if (!loggedInUserId) {
    throw new Error("You must be logged in!");
  }

  // const userId = "cjvaqrrbdt8u50b126ci5mgdm"
  // if (!userId) throw new Error("You must be signed in to create a credit card")

  // 2. recalculate the total for the price
  // 3. create the stripe card
  const user = await ctx.db.query.user(
    { where: { id: loggedInUserId } },
    `{id, email}`
  );

  const card = await createCard({
    stripeToken: token,
    email: user.email,
    user: user,
    ctx,
    info
  });

  return card;
}

module.exports = createCreditCard;
