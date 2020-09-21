const {
  addPaymentToWallet
} = require("../../../lib/payments/addPaymentToWallet");
const db = require("../../../db");

const payment_intent_succeeded = async ({ event }) => {
  // just get the fields we need, including the lease the wallet is for. if it is not PAID we need to check if the new amount exceeds
  // the 1 weeks rent. if it does, we update the lease status to paid

  console.log("Attempting to add payment to the wallet");

  const { amount_received } = event.data.object;

  const { userId, leaseId, walletId } = event.data.object.metadata;
  addPaymentToWallet({
    amount: amount_received,
    db: db,
    walletId: walletId,
    userId: userId,
    leaseId: leaseId,
    paymentData: {
      bankName: null,
      bankBranch: null,
      bankAccount: null,
      bankRef: null,
      type: "STRIPE",
      userId: userId,
      leaseId: leaseId,
      // propertyId: ID
      stripePaymentId: event.id,
      object: event,
      amount: event.data.object.amount_received,
      description:
        "Stripe payment acknowledged by system and added to lease wallet",
      status: event.data.object.status
    }
  });

  console.log("I GUESS WE ADDED payment to the wallet");
};

module.exports = payment_intent_succeeded;
