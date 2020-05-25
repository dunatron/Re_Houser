var schedule = require("node-schedule");
const db = require("../../db");

// pass in like skip etc to this getActiveLeases
async function getActiveLeases() {
  const activeLeases = await db.query.propertyLeases(
    { where: { active: true } },
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

async function createLeaseTasks(db) {
  const leases = await getActiveLeases();
  // should maybe be paginated. actually will need to be if we want to scale.
  // essentially just get the count an leases that are active, and process the first 50 with there tsks
  // rinse and repeat
  console.log("The active leases to check things on => ", leases);

  var j = schedule.scheduleJob("55 * * * *", async function() {});

  // tuesday at 2:01 in the morning
  schedule.scheduleJob({ hour: 2, minute: 1, dayOfWeek: 2 }, async function() {
    console.log(
      "check for any payments/ wallets that are running in and leases etc!"
    );
  });
}

module.exports = createLeaseTasks;
