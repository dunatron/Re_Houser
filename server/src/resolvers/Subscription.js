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
  const sub = context.db.subscription.rentalApplication(
    { where: args.where },
    info
  )
  return sub
}
const rentalApplicationUpdateSub = {
  subscribe: rentalApplicationUpdateSubscription,
}

// rentalApplication Pending SUbscription
async function rentalApplicationCompletedSubscription(
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
const rentalApplicationCompletedSub = {
  subscribe: rentalApplicationCompletedSubscription,
}

// New messages Subscription
async function message(parent, args, context, info) {
  return context.db.subscription.message(
    { where: { mutation_in: ["CREATED"] } },
    info
  )
}
const messageSub = {
  subscribe: message,
}

module.exports = {
  rentalApplicationCreatedSub,
  rentalApplicationUpdateSub,
  messageSub
}
