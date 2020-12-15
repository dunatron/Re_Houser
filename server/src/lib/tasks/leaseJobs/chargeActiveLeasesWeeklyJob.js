var CronJob = require("cron").CronJob;

const db = require("../../../db");

function makeNegative(number) {
  if (number > 0) {
    return (number = -number);
  }
  return number;
}

async function getActiveLeases() {
  const activeLeases = await db.query
    .propertyLeases(
      { where: { stage_in: ["SIGNED", "PAID"] } },
      // { where: { active: true } },
      `{ 
          id
          rent
          moveInDate
          expiryDate
          property {
              id
              location
          }
          wallet { 
              id
              amount
          } 
          lessees {
              id
              user {
                  id
                  email
              }
          }
          lessors {
              id 
              user {
                  id 
                  email
              }
          }
      }`
    )
    .catch(e => console.log("Catch active leases err => ", e));
  return activeLeases;
}

async function checkWalletAmount(lease) {
  const negative1Week = makeNegative(lease.rent);
  const negative2Week = makeNegative(lease.rent * 2);
  const negative3Week = makeNegative(lease.rent * 3);
  const negative4Week = makeNegative(lease.rent * 4);

  if (lease.wallet.amount < negative4Week) {
    console.log("Is less than 4 weeks rent ");
    console.log("Wallet => ", lease.wallet.amount);
    console.log("rent less  => ", negative4Week);
    return;
  }

  if (lease.wallet.amount < negative3Week) {
    console.log("Is less than 3 weeks rent ");
    console.log("Wallet => ", lease.wallet.amount);
    console.log("rent less  => ", negative3Week);
    return;
  }

  if (lease.wallet.amount < negative2Week) {
    console.log("Is less than 2 weeks rent ");
    console.log("Wallet => ", lease.wallet.amount);
    console.log("rent less  => ", negative2Week);
    return;
  }

  if (lease.wallet.amount < negative1Week) {
    console.log("Is less than a weeks rent ");
    console.log("Wallet => ", lease.wallet.amount);
    console.log("rent less  => ", negative1Week);
    return;
  }

  if (lease.wallet.amount < 0) {
    console.log("This obviously isnt right, probably happens alot");
    console.log("Do lessees want to know about the weekly rent charge...");
    // if he wallet is below zero dollars we need inform those fucks to pay up!!!!
  }

  // nothing to alert here, continue
  return;
}

async function chargeLeaseWalletWithRent(lease) {
  const updatedLease = await db.mutation.updatePropertyLease(
    {
      where: {
        id: lease.id
      },
      data: {
        wallet: {
          update: {
            amount: lease.wallet.amount - lease.rent,
            charges: {
              create: {
                amount: lease.rent,
                reason: "RENT",
                description: "Weekly rent charge"
              }
            }
          }
        }
      }
    },
    `{id,wallet{id,amount}}`
  );
  // do we email them if the wallet is negative?

  // business logic to do different things if rent hasnt been paid
  checkWalletAmount({ ...lease, ...updatedLease });

  return updatedLease;
}

// every 30 minutes
// const job = new CronJob("0 */30 * * * *", function() {
//   const d = new Date();
//   console.log("Every 30 minutes I run:", d);
//   getActiveLeases().then(leases => {
//     leases.forEach((l, i) => chargeLeaseWalletWithRent(l));
//     console.log("The active leases to check things on => ", leases);
//   });
// });

// actually correct time to run
// const chargeActiveLeasesWeeklyJob = new CronJob("00 10 12 * * 4", function() {
//   getActiveLeases().then(leases => {
//     leases.forEach((l, i) => chargeLeaseWalletWithRent(l));
//     console.log("The active leases to check things on => ", leases);
//   });
// });

const chargeActiveLeasesWeeklyJob = new CronJob("0 */30 * * * *", function() {
  getActiveLeases().then(leases => {
    leases.forEach((l, i) => chargeLeaseWalletWithRent(l));
    console.log("The active leases to check things on => ", leases);
  });
});

module.exports = chargeActiveLeasesWeeklyJob;
