const stripe = require("./stripe")
const db = require("../db")
/**
 * It is just stripe calling them customers. play with this a bit and maybe change it to
 * createCard instead
 */

exports.createCard = async ({ stripeToken, email, user, ctx }) => {
  // const charge = await stripe.charges.create({
  //   amount,
  //   currency: 'USD',
  //   source: args.token,
  // });
  console.group("Begin Creating Credit card")
  const card = await stripe.customers.create({
    source: stripeToken,
    email: email,
  })
  const { id, created, default_source } = card
  // this is the cardId created on the stripe account
  const cardId = default_source
  // Maybe we can be storing stripe users and this array can have many cards???
  const cardData = card.sources.data[0]
  console.log("cardData => ", cardData)
  console.log("user => ", user)
  console.log("========NEW CARD========")

  const newCard = await db.mutation.createCreditCard(
    {
      data: {
        cardOwner: {
          connect: {
            id: user.id,
            // email: user.email,
          },
        },
        fingerprint: cardData.fingerprint,
        last4: cardData.last4,
        name: cardData.name,
        stripeCardId: cardData.stripeCardId,
        exp_month: cardData.exp_month,
        exp_year: cardData.exp_year,
      },
    },
    `{id}`
  )

  console.log("OUR CARD ASTORAGE +> ", newCard)

  console.groupEnd("END Creating Credit card")
  return cardData
}
