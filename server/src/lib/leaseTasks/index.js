var schedule = require("node-schedule");
const db = require("../../db");

// pass in like skip etc to this getActiveLeases
async function getActiveLeases() {
  const activeLeases = await db.query.propertyLeases(
    {},
    // { where: { active: true } },
    `{ 
        id
        rent
        moveInDate
        expiryDate
        active
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
  );
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

async function createLeaseTasks() {
  // should maybe be paginated. actually will need to be if we want to scale.
  // essentially just get the count an leases that are active, and process the first 50 with there tsks
  // rinse and repeat

  // charge a lease with the rent!

  const leases = await getActiveLeases();
  console.log("The active leases to check things on => ", leases);

  // this updates the wallet. whats our rules for this?
  // like do we email them if there account falls below negative?
  // if its negative + an extra weeks rent buffer????
  leases.forEach((l, i) => chargeLeaseWalletWithRent(l));

  // tuesday at 2:01 in the morning
  schedule.scheduleJob({ hour: 2, minute: 1, dayOfWeek: 2 }, async function() {
    //
  });
}

module.exports = createLeaseTasks;
