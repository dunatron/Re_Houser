const chargeActiveLeasesWeeklyJob = require("./chargeActiveLeasesWeeklyJob");
const inspectionNotificationTask = require("./inspectionNotificationTask");

// create a new charge too

// Cron examples => https://github.com/kelektiv/node-cron/tree/master/examples
async function createLeaseTasks() {
  chargeActiveLeasesWeeklyJob.start();
  inspectionNotificationTask(); // already starts inside a func. split the two jobs
  // 10:52 am
  // const morningJob = new CronJob("00 52 10 * * *", function() {

  // tuesday 11:30 am weekly task
  // const weeklyJob = new CronJob("00 30 11 * * 2", function() {

  // const weeklyJob = new CronJob("00 30 11 * * 2", async function() {

  // const weeklyJob = new CronJob("00 08 11 * * 4", async function() {

  // const weeklyJob = new CronJob("00 10 12 * * 4", function() {

  // every 30 mins
  // const job = new CronJob("0 */30 * * * *", function() {
}

module.exports = createLeaseTasks;
