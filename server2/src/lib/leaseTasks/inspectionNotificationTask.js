const CronJob = require("cron").CronJob;
const Moment = require("moment");
const MomentRange = require("moment-range");
const moment = MomentRange.extendMoment(Moment);

const db = require("../../db");

const emailCEO = require("../emails/emailCEO");

async function getInspectionsXDaysOut(days) {
  const now = moment().format();
  const xDaysOut = moment()
    .add(days, "days")
    .format();
  const activeLeases = await db.query
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
  return activeLeases;
}

const sendInspectionsEmail = (subject, inspections) => {
  const body = inspections.reduce((acc, inspection) => {
    return (
      acc +
      `<div style="border: 1px solid #e91e63; padding: 8px; margin-bottom: 4px;">
                <div>Id: ${inspection.id}</div>
                <div>property: ${inspection.property.location}</div>
                <div>date: ${moment(inspection.date).format(
                  "dddd, MMMM Do YYYY, h:mm:ss a"
                )}
                </div>
            </div>`
    );
  }, `<div><h2>Inspections List (${inspections.length})</h2></div>`);
  emailCEO({
    ctx: null,
    subject: subject,
    body: body
  });
};

async function inspectionNotificationTask() {
  // every week at 6:30 am
  const weeklyJob = new CronJob("00 30 06 * * 1", function() {
    getInspectionsXDaysOut(7).then(inspections =>
      sendInspectionsEmail(
        `Weekly Inspections List ${moment().format("DD/MM/YY")}`,
        inspections
      )
    );
  });
  weeklyJob.start();
  // every day at 6:40 am
  const dailyJob = new CronJob("00 40 6 * * *", function() {
    getInspectionsXDaysOut(1).then(inspections =>
      sendInspectionsEmail(
        `Todays Inspections List ${moment().format("DD/MM/YY")}`,
        inspections
      )
    );
  });
  dailyJob.start();
}

module.exports = inspectionNotificationTask;
