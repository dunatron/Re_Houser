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
  );
}
const rentalApplicationCreatedSub = {
  subscribe: rentalApplicationCreatedSubscription
};

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
  );
  return sub;
}
const rentalApplicationUpdateSub = {
  subscribe: rentalApplicationUpdateSubscription
};

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
  );
}
const rentalApplicationCompletedSub = {
  subscribe: rentalApplicationCompletedSubscription
};

// New messages Subscription
async function message(parent, args, context, info) {
  return context.db.subscription.message({ ...args }, info);
}
const messageSub = {
  subscribe: message
};

async function chat(parent, args, context, info) {
  return context.db.subscription.chat({ ...args }, info);
}
const chatSub = {
  subscribe: chat
};

// wallet subscription
async function wallet(parent, args, context, info) {
  return context.db.subscription.wallet({ ...args }, info);
}

const walletSub = {
  subscribe: wallet
};

async function propertyLease(parent, args, context, info) {
  return context.db.subscription.propertyLease({ ...args }, info);
}

const propertyLeaseSub = {
  subscribe: propertyLease
};

async function payment(parent, args, context, info) {
  return context.db.subscription.payment({ ...args }, info);
}

const paymentSub = {
  subscribe: payment
};

async function charge(parent, args, context, info) {
  return context.db.subscription.charge({ ...args }, info);
}

const chargeSub = {
  subscribe: charge
};

async function rentalAppraisal(parent, args, context, info) {
  return context.db.subscription.rentalAppraisal({ ...args }, info);
}

const rentalAppraisalSub = {
  subscribe: rentalAppraisal
};

async function property(parent, args, context, info) {
  return context.db.subscription.property({ ...args }, info);
}

const propertySub = {
  subscribe: property
};

async function user(parent, args, context, info) {
  return context.db.subscription.user({ ...args }, info);
}

const userSub = {
  subscribe: user
};

async function inspection(parent, args, context, info) {
  return context.db.subscription.inspection({ ...args }, info);
}

const inspectionSub = {
  subscribe: inspection
};

async function rentalApplication(parent, args, context, info) {
  return context.db.subscription.rentalApplication({ ...args }, info);
}

const rentalApplicationSub = {
  subscribe: rentalApplication
};




module.exports = {
  rentalApplicationCreatedSub,
  rentalApplicationUpdateSub,
  chatSub,
  messageSub,
  walletSub,
  propertyLeaseSub,
  paymentSub,
  chargeSub,
  rentalAppraisalSub,
  propertySub,
  userSub,
  inspectionSub,
  rentalApplicationSub
};
