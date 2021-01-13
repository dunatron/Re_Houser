const nanoid = require("nanoid");

/**
 * we will use bankRef on the PropertyLease to get the lease.
 * we get the leases wallet along with this
 * we then transfer the details manually, amount, particulars, date
 *
 * @param {*} parent
 * @param {*} args
 * @param {*} ctx
 * @param {*} info
 */

// PAYMENT
// id: ID! @unique @id
// wallet: Wallet @relation(name: "WalletPayments")
// userId: ID!
// bankName: String
// bankBranch: String
// bankAccount: String
// bankRef: String
// type: PaymentType
// reason: PaymentReason
// leaseId: ID
// propertyId: ID
// stripePaymentId: String
// object: Json
// amount: Float
// createdAt: DateTime! @createdAt
// description: String
// status: String
async function addBankTransferToLease(parent, args, ctx, info) {
  const { userId, userPermissions } = ctx.request;

  const { bankRef, amount } = args;

  if (!loggedInUserId) {
    throw new Error("You must be logged in!");
  }

  throw new Error("To Complete");

  return newViewing;
}

module.exports = addBankTransferToLease;
