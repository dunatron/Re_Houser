const CronJob = require("cron").CronJob;
const Moment = require("moment");
const MomentRange = require("moment-range");
const moment = MomentRange.extendMoment(Moment);
const sendInspectionsEmail = require("../../emails/sendInspectionsEmail");
const getInspectionsXDaysOut = require("../../getInspectionsXDaysOut");

const weeklyInspectionsJob = new CronJob("00 30 06 * * 1", function() {
  getInspectionsXDaysOut(7).then(inspections =>
    sendInspectionsEmail(
      `Weekly Inspections List ${moment().format("DD/MM/YY")}`,
      inspections
    )
  );
});
module.exports = weeklyInspectionsJob;
