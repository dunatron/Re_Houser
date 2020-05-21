// import Stripe from "stripe";
const Stripe = require("stripe");

async function createPaymentIntent(parent, args, ctx, info) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: "usd"
  });
  return paymentIntent;
}

module.exports = createPaymentIntent;
