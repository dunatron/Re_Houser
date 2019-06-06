const { createCard } = require("../../lib/paymentAPI")

async function createPropertyLease(parent, { data }, ctx, info) {
  console.log("DO WE AT LEAST GET TO HERE ????? => ", data)
  const loggedInUserId = await ctx.request.userId
  // need to be logged in
  // if (!loggedInUserId) {
  //   throw new Error("You must be logged in!")
  // }
  // throw new Error("Yea na, you need to implememnt this mate")

  // just highlohting we need to dp something herte
  const recievedData = data

  const newLease = await ctx.db.mutation.createPropertyLease(
    {
      data: recievedData,
    },
    // {},
    info
  )

  console.log("newLease => ", newLease)
  return newLease
  // ToDo: user should also be proper owner or maybe admin
}

module.exports = createPropertyLease
