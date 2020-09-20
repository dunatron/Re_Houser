const CronJob = require("cron").CronJob;
const Moment = require("moment");
const MomentRange = require("moment-range");
const moment = MomentRange.extendMoment(Moment);
const sendInspectionsEmail = require("../../emails/sendInspectionsEmail");
const getInspectionsXDaysOut = require("../../getInspectionsXDaysOut");

const dailyInspectionsJob = new CronJob("00 40 6 * * *", function() {
  getInspectionsXDaysOut(1).then(inspections =>
    sendInspectionsEmail(
      `Todays Inspections List ${moment().format("DD/MM/YY")}`,
      inspections
    )
  );
});

module.exports = dailyInspectionsJob;
