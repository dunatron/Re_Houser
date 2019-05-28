// rentalApplication created subscription
async function rentalApplicationCreatedSubscription(
  parent,
  args,
  context,
  info
) {
  return context.db.subscription.rentalApplication(
    { where: { mutation_in: ["CREATED"] } },
    info
  )
}
const rentalApplicationCreatedSub = {
  subscribe: rentalApplicationCreatedSubscription,
}

// rentalApplication update subscription
async function rentalApplicationUpdateSubscription(
  parent,
  args,
  context,
  info
) {
  return context.db.subscription.rentalApplication(
    { where: { mutation_in: ["UPDATED"] } },
    info
  )
}
const rentalApplicationUpdateSub = {
  subscribe: rentalApplicationUpdateSubscription,
}

module.exports = {
  rentalApplicationCreatedSub,
  rentalApplicationUpdateSub,
}
