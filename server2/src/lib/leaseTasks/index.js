var schedule = require("node-schedule");

var CronJob = require("cron").CronJob;

const db = require("../../db");

// pass in like skip etc to this getActiveLeases
// async function getActiveLeases() {
//   const activeLeases = await db.query.propertyLeases(
//     {},
//     // { where: { active: true } },
//     `{
//         id
//         rent
//         moveInDate
//         expiryDate
//         active
//         property {
//             id
//             location
//         }
//         wallet {
//             id
//             amount
//         }
//         lessees {
//             id
//             user {
//                 id
//                 email
//             }
//         }
//         lessors {
//             id
//             user {
//                 id
//                 email
//             }
//         }
//     }`
//   );
//   return activeLeases;
// }

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

function makeNegative(number) {
  if (number > 0) {
    return (number = -number);
  }
  return number;
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

// create a new charge too
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
// Cron examples => https://github.com/kelektiv/node-cron/tree/master/examples
async function createLeaseTasks() {
  // const midnightJob = new CronJob("00 52 10 * * *", function() {
  //   const d = new Date();
  //   console.log("Midnight:", d);
  // });
  // console.log("After job instantiation");
  // midnightJob.start();

  // // 10:52 am
  // const morningJob = new CronJob("00 52 10 * * *", function() {
  //   const d = new Date();
  //   console.log("10 52 in the morning:", d);
  // });
  // console.log("After job instantiation");
  // morningJob.start();

  // var job = new CronJob("* * * * * *", function() {
  //   console.log("You will see this message every second");
  // });
  // job.start();

  // // tuesday 11:30 am weekly task
  // const weeklyJob = new CronJob("00 30 11 * * 2", function() {
  //   const d = new Date();
  //   console.log("Weekly Job:", d);
  // });

  // weeklyJob.start();

  // const weeklyJob = new CronJob("00 30 11 * * 2", async function() {
  //   const leases = await getActiveLeases();
  //   console.log("The active leases to check things on => ", leases);
  //   leases.forEach((l, i) => chargeLeaseWalletWithRent(l));
  // });

  // weeklyJob.start();

  // const weeklyJob = new CronJob("00 08 11 * * 4", async function() {
  //   const leases = await getActiveLeases();
  //   console.log("The active leases to check things on => ", leases);
  //   leases.forEach((l, i) => chargeLeaseWalletWithRent(l));
  // });

  // weeklyJob.start();

  const weeklyJob = new CronJob("00 10 12 * * 4", function() {
    getActiveLeases().then(leases => {
      leases.forEach((l, i) => chargeLeaseWalletWithRent(l));
      console.log("The active leases to check things on => ", leases);
    });
  });

  weeklyJob.start();

  const job = new CronJob("0 */30 * * * *", function() {
    const d = new Date();
    console.log("Every 30 minutes I run:", d);
    getActiveLeases().then(leases => {
      leases.forEach((l, i) => chargeLeaseWalletWithRent(l));
      console.log("The active leases to check things on => ", leases);
    });
  });
  console.log("After job instantiation");
  job.start();

  // const leases = getActiveLeases().then(leases => {
  //   console.log("recieved leases => ", leases);
  // });

  // should maybe be paginated. actually will need to be if we want to scale.
  // essentially just get the count an leases that are active, and process the first 50 with there tsks
  // rinse and repeat
  // charge a lease with the rent!
}

module.exports = createLeaseTasks;
