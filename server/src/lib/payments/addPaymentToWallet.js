exports.addPaymentToWallet = async ({ amount, db, walletId, paymentData }) => {
  try {
    const wallet = await db.query.wallet(
      {
        where: {
          id: walletId
        }
      },
      `{id, amount, lease{id,stage,rent}}`
    );

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

    if (wallet.lease.stage !== "PAID") {
      // if wallet.amount >= wallet.lease.rent
      // update the lease stage
      if (wallet.amount >= wallet.lease.rent) {
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
  } catch (e) {
    console.log("Add payment error => ", e);
  }
};
