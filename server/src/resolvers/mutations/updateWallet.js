const { addChargeToWallet } = require("../../lib/payments/addChargeToWallet");

async function updateWallet(parent, { data, where }, ctx, info) {
  console.log("The wallet data => ", data);
  const updates = {
    ...data
  };
  // 1. only wizards can call this function
  // 2. there are two types to listen for really. payments and charges
  // 3. if charges create a charge and remove it from the wallet amount
  // 4. if payment create a payment and add it to the amount
  // Note: ideally if negative and charging it would add to the wallet amount
  // Note: we need to handle charges variables below
  // create: [ChargeCreateWithoutWalletInput!]
  // connect: [ChargeWhereUniqueInput!]
  // set: [ChargeWhereUniqueInput!]
  // disconnect: [ChargeWhereUniqueInput!]
  // delete: [ChargeWhereUniqueInput!]
  // update: [ChargeUpdateWithWhereUniqueWithoutWalletInput!]
  // updateMany: [ChargeUpdateManyWithWhereNestedInput!]
  // deleteMany: [ChargeScalarWhereInput!]
  // upsert: [ChargeUpsertWith

  const wallet = await ctx.db.query.wallet(
    {
      where
    },
    `{id, amount}`
  );

  // we can probably let lib functions do this for us. and at the end just requery the wallet
  // let amount = wallet.amount;

  // cannot update the wallet amount directly. It must be through a charge or a payment
  if (updates.amount) {
    delete updates.amount;
    throw new Error(
      "You cannot update the wallet amount directly. It must be through a charge or a payment. Please update your code to use a charge or payment"
    );
  }

  console.log("The wallet updates => ", updates);

  if (updates.charges) {
    console.log("Do something with charges");
    if (data.charges.create) {
      console.log("adding charges to wallet");

      for (const charge of data.charges.create) {
        await addChargeToWallet({
          amount: charge.amount,
          db: ctx.db,
          walletId: wallet.id,
          chargeData: charge
        });
      }
    }
  }

  if (updates.payments) {
    console.log("Do something with payments");
  }

  const updatedWallet = await ctx.db.query.wallet(
    {
      where
    },
    info
  );

  console.log("The updated Wallet => ", updatedWallet);
  return updatedWallet;
}

module.exports = updateWallet;
