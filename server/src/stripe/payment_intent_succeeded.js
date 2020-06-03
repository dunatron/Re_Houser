const { addPaymentToWallet } = require("../lib/payments/addPaymentToWallet");

exports.payment_intent_succeeded = async ({ event, db }) => {
  // just get the fields we need, including the lease the wallet is for. if it is not PAID we need to check if the new amount exceeds
  // the 1 weeks rent. if it does, we update the lease status to paid

  const { amount_received } = event.data.object;
  console.log("===Payment Intent UPDATED===");
  addPaymentToWallet({
    amount: amount_received,
    db: db,
    walletId: event.data.object.metadata.walletId
  });

  // PROBABLY SHOULD EXTRACT to handle wallet payment. with amount. that way we can have admins on the front end passing in an amount

  //   const wallet = await db.query.wallet(
  //     {
  //       where: {
  //         id: event.data.object.metadata.walletId
  //       }
  //     },
  //     `{lease: {id, stage, rent}, amount}`
  //   );

  //   const updatedWallet = await db.mutation.updateWallet({
  //     where: {
  //       id: event.data.object.metadata.walletId
  //     },
  //     data: {
  //       amount: wallet.amount + amount_received
  //     }
  //   });

  //   if (wallet.lease.stage !== "PAID") {
  //     // if wallet.amount >= wallet.lease.rent
  //     // update the lease stage
  //     if (wallet.amount >= wallet.lease.rent) {
  //       db.mutation.updateLease({
  //         where: {
  //           id: wallet.lease.id
  //         },
  //         data: {
  //           stage: "PAID"
  //         }
  //       });
  //     }
  //   }
  //   console.log("THANK FUCK THE WALLET => ", wallet);
  //   console.log("The amount that we would charge => ", amount_received);
  //   console.log("updatedWallet => ", updatedWallet);
};
