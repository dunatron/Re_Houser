const Moment = require("moment");
const MomentRange = require("moment-range");
const moment = MomentRange.extendMoment(Moment);
const db = require("../db");

async function getInspectionsXDaysOut(days) {
  const now = moment().format();
  const xDaysOut = moment()
    .add(days, "days")
    .format();
  const inspections = await db.query
    .inspections(
      {
        where: {
          date_gte: now,
          completed: false,
          date_lte: xDaysOut
        }
      },
      `{ 
          id
          date
          completed
          notes
          property {
            id 
            location
          }
      }`
    )
    .catch(e => console.log("Inspections task err => ", e));
  return inspections;
}

module.exports = getInspectionsXDaysOut;
