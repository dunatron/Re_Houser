const stripe = require("stripe")(process.env.STRIPE_SECRET);

const stripePostIntentRoute = async (req, res, next) => {
  console.log("A STRIPE INTENT TO PAY");
  const token = req.cookies.token;
  if (!token) {
    return next();
  }

  if (!req.userId) {
    // throw error. only loigged in users can create intents
  }

  if (!req.body) {
    // throw error
  }

  const { amount, leaseId, walletId } = req.body;

  if (!amount) {
    // throw errro as they must have an amount they intend to pay
  }

  // ToDo: get current logged in user and add there email etc
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "nzd",
      payment_method_types: ["card"],
      metadata: {
        userId: req.userId,
        leaseId: leaseId,
        walletId: walletId
      }
    });

    res.send({ client_secret: paymentIntent.client_secret });
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
};

module.exports = stripePostIntentRoute;
