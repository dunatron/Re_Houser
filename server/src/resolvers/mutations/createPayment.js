// import Stripe from "stripe";
// const Stripe = require("stripe");

// NOTE: this will be for admin use only, is the bank account way. will need to restrict to only admins being able to do this
async function createPayment(parent, args, ctx, info) {
  // const paymentIntent = await stripe.paymentIntents.create({
  //   amount: 1099,
  //   currency: "usd"
  // });
  // return paymentIntent;
  const payment = await ctx.db.mutation.createPayment(
    {
      ...args
    },
    info
  );

  return payment;
}

module.exports = createPayment;
