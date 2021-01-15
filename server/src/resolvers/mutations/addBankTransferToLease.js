const nanoid = require("nanoid");
const { _isWizard } = require("../../lib/permissionsCheck");
const { addPaymentToWallet } = require("../../lib/payments/addPaymentToWallet");

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

  const isWizard = _isWizard(ctx);

  if (!userPermissions) {
    throw new Error("You need permissions to manually add bank transfers");
  }

  if (!isWizard) {
    throw new Error("You must have wizard permissions");
  }

  const lease = await ctx.db.query.propertyLease(
    {
      where: {
        bankRef: bankRef
      }
    },
    `{id, wallet{id, amount}}`
  );

  const walletId = lease.wallet.id;

  await addPaymentToWallet({
    amount: args.data.amount,
    db: ctx.db,
    walletId: walletId,
    paymentData: args.data
  });

  const updatedLeaseWithPayments = await ctx.db.query.propertyLease(
    {
      where: {
        bankRef: bankRef
      }
    },
    info
  );

  console.log("updatedLeaseWithPayments => ", updatedLeaseWithPayments);

  return updatedLeaseWithPayments;
}

module.exports = addBankTransferToLease;
