exports.addPaymentToWallet = async ({ amount, db, walletId, paymentData }) => {
  try {
    console.log("ADD PAYMENT TO WALLET");
    const wallet = await db.query.wallet(
      {
        where: {
          id: walletId
        }
      },
      `{id, amount, lease{id,stage,rent,bondType}}`
    );

    console.log("Original Wallet => ", wallet);

    const updatedWallet = await db.mutation.updateWallet({
      where: {
        id: walletId
      },
      data: {
        amount: wallet.amount + amount,
        payments: {
          create: {
            ...paymentData
          }
        }
      }
    });

    console.log("Updated Wallet => ", updatedWallet);

    // this logic should work.
    // if the updatedWallet amount is greater than or = to 1 weeks rent on the wallet.lease.rent
    // Lets make this work well.
    // Like atm, when the lease gets fialised and placed into the signed stage we automatically are charging 2 weeks rent

    if (wallet.lease.stage !== "PAID") {
      // if wallet.amount >= wallet.lease.rent
      // update the lease stage
      const bondAmount = getBondAmount(lease);
      if (updatedWallet.amount >= wallet.lease.rent - bondAmount) {
        db.mutation.updatePropertyLease({
          where: {
            id: wallet.lease.id
          },
          data: {
            stage: "PAID"
          }
        });
      }
    }
  } catch (e) {}
};
