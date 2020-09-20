const stripe = require("stripe")(process.env.STRIPE_SECRET);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const payment_intent_succeeded = require("../../lib/stripe/webhooks/payment_intent_succeeded");

const stripeWebhookRoute = (req, res, next) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    // On error, log and return the error message
    console.log(`❌ Error message: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "payment_intent.created") {
    console.log("✅ payment_intent.created:");
  }

  if (event.type === "payment_intent.succeeded") {
    payment_intent_succeeded({ event: event });
  }

  // payment_intent.created && charge.succeeded are different
  if (event.type === "charge.succeeded") {
    console.log("✅ charge.succeeded:", event.data.object);
  }
  console.log("✅ Success:", event.id);
  console.log("✅ EVENT:", event);
  // Return a response to acknowledge receipt of the event
  res.json({ received: true });
};

module.exports = stripeWebhookRoute;
