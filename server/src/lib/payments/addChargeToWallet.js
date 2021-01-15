exports.addChargeToWallet = async ({ amount, db, walletId, chargeData }) => {
  try {
    const wallet = await db.query.wallet(
      {
        where: {
          id: walletId
        }
      },
      `{id, amount}`
    );

    await db.mutation.updateWallet({
      where: {
        id: walletId
      },
      data: {
        amount: wallet.amount - amount,
        // amount: 30000,
        charges: {
          create: {
            ...chargeData
          }
        }
      }
    });
  } catch (e) {}
};
