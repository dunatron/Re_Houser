const moment = require("moment");
const stripe = require("./stripe");
const db = require("../db");

// https://stripe.com/docs/saving-cards
/**
 * It is just stripe calling them customers. play with this a bit and maybe change it to
 * createCard instead
 */

exports.createCard = async ({ stripeToken, email, user, ctx, info }) => {
  const card = await stripe.customers.create({
    source: stripeToken,
    email: email
  });
  const { id, created, default_source } = card;
  // this is the cardId created on the stripe account
  const cardId = default_source;
  // Maybe we can be storing stripe users and this array can have many cards???
  const cardData = card.sources.data[0];
  const newCard = await db.mutation.createCreditCard(
    {
      data: {
        cardOwner: {
          connect: {
            id: user.id
            // email: user.email,
          }
        },
        fingerprint: cardData.fingerprint,
        last4: cardData.last4,
        name: cardData.name,
        stripeCardId: cardData.id,
        stripeCustomerId: cardData.customer,
        exp_month: cardData.exp_month,
        exp_year: cardData.exp_year,
        brand: cardData.brand,
        country: cardData.country,
        address_city: cardData.country,
        address_country: cardData.address_country,
        address_line1: cardData.address_line1,
        address_line1_check: cardData.address_line1_check,
        address_line2: cardData.address_line2,
        address_state: cardData.address_state,
        address_zip: cardData.address_zip,
        address_zip_check: cardData.address_zip_check,
        object: cardData.object,
        cvc_check: cardData.cvc_check,
        funding: cardData.funding
      }
    },
    info
  );
  return newCard;
};

exports.chargeCard = async ({
  stripeCustomerId,
  amount,
  currency,
  userId,
  leaseId,
  propertyId
}) => {
  const charge = await stripe.charges.create({
    amount: amount,
    currency: currency,
    customer: stripeCustomerId,
    description:
      "Charged for advertising a property and creating a successful lease with tenants"
  });
  // create new payment mutation
  const payment = await db.mutation.createPayment(
    {
      data: {
        userId: userId,
        leaseId: leaseId,
        propertyId: propertyId,
        stripePaymentId: charge.id,
        object: charge.object,
        amount: charge.amount,
        amount_refunded: charge.amount_refunded,
        balance_transaction: charge.balance_transaction,
        captured: charge.captured,
        created: moment(charge.create).format(), // convert timestamp to normal
        currency: charge.currency,
        customer: charge.customer,
        description: charge.description,
        paid: charge.paid,
        payment_method: charge.payment_method,
        status: charge.status
      }
    },
    `{id}`
  );
  return payment;
};
