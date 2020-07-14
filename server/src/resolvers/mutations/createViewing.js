const Moment = require("moment");
const MomentRange = require("moment-range");
const moment = MomentRange.extendMoment(Moment);
const { createActivity } = require("../../lib/createActivity");

// https://github.com/rotaready/moment-range
function checkForViewingClash({ viewing, data }) {
  console.log("New viewing Data => ", data);
  console.log("System viewing Data => ", viewing);

  switch (viewing.recurringType) {
    case "ONCE":
      console.log("VIEWING IS RECURE ONCE");
      checkOnceViewing({ viewing: viewing, data: data });
      break;
    case "DAILY":
      // so we need to check the DAILYS ALREADY CREATED
      checkDailyViewing({ viewing: viewing, data: data });
      break;
    case "WEEKLY":
      checkWeeklyViewing({ viewing: viewing, data: data });
      break;
    case "FORTNIGHTLY":
      checkFortnightlyViewing({ viewing: viewing, data: data });
      break;
    case "MONTHLY":
      checkMonthlyViewing({ viewing: viewing, data: data });
      break;
    default:
  }
}

function checkMonthlyViewing({ viewing: viewing, data: data }) {
  var i = 0;
  const viewingDateTime = moment(viewing.dateTime);
  // we actually need to see how many weeks have elapsed i.e if on the 1st and the date is the 21st.
  //
  while (i < 12) {
    var date = moment()
      .set({
        day: viewingDateTime.get("day"),
        hour: viewingDateTime.get("hour"),
        minute: viewingDateTime.get("minute")
      })
      .add(i, "months")
      .format();
    let viewingData = {
      ...viewing,
      dateTime: date
    };
    checkNewViewing({ viewing: viewingData, data: data });
    i++;
  }
}

function checkFortnightlyViewing({ viewing, data }) {
  var i = 0;
  const viewingDateTime = moment(viewing.dateTime);
  // this also needs to be on an odd week start
  while (i < 8) {
    var date = moment()
      .set({
        day: viewingDateTime.get("day"),
        hour: viewingDateTime.get("hour"),
        minute: viewingDateTime.get("minute")
      })
      .add(i * 2, "weeks")
      .format();
    let viewingData = {
      ...viewing,
      dateTime: date
    };
    checkNewViewing({ viewing: viewingData, data: data });
    i++;
  }
}

function checkWeeklyViewing({ viewing, data }) {
  var i = 0;
  const viewingDateTime = moment(viewing.dateTime);
  while (i < 8) {
    var date = moment()
      .set({
        day: viewingDateTime.get("day"),
        hour: viewingDateTime.get("hour"),
        minute: viewingDateTime.get("minute")
      })
      .add(i, "weeks")
      .format();
    console.log("a daily viewing to check => ", date);
    let viewingData = {
      ...viewing,
      dateTime: date
    };
    checkNewViewing({ viewing: viewingData, data: data });
    i++;
  }
}

// viewing is a daily task. like get todays date. check time is what we need to do for this
// viewing is a daily task. make sure that the time does not clash
function checkDailyViewing({ viewing, data }) {
  // throw new Error("This sucks lol");
  // the viewing data would need to be updated. we would want the first instance to be todays date maybe, unless the time has passed, then we use tommorrows as first
  // and make 7 times increasing the day by 1
  var i = 0;
  var time = moment(viewing.dateTime, "HH:mm");
  console.log("CHECK DAILY VIEWINGS");
  // 30 or 7? like 30 for a month 7 for a week
  while (i < 7) {
    var date = moment()
      .set({
        hour: time.get("hour"),
        minute: time.get("minute")
      })
      .add(i, "days")
      .format();
    console.log("a daily viewing to check => ", date);
    let viewingData = {
      ...viewing,
      dateTime: date
      // change the dateTime
    };
    checkNewViewing({ viewing: viewingData, data: data });
    i++;
  }
}

// moment()
//     .subtract(3, "month")
//     .format(),
// viewing is One time only
function checkOnceViewing({ viewing, data }) {
  checkNewViewing({ viewing: viewing, data: data });
}

function checkNewViewing({ viewing, data }) {
  const start = moment(data.dateTime).format();
  const end = moment(data.dateTime)
    .add(data.minutesFor, "minutes")
    .format();
  const oldStart = moment(viewing.dateTime).format();
  const oldEnd = moment(viewing.dateTime)
    .add(viewing.minutesFor, "minutes")
    .format();
  let range = moment.range(start, end);

  const startTime = moment(data.dateTime).format("hh:mm:ss");
  const endTime = moment(data.dateTime)
    .add(data.minutesFor, "minutes")
    .format("hh:mm:ss");

  let oldStartTime = moment(viewing.dateTime).format("hh:mm:ss");
  let oldEndTime = moment(viewing.dateTime)
    .add(viewing.minutesFor, "minutes")
    .format("hh:mm:ss");

  console.log("CHECK DATES");
  console.log("start => ", start);
  console.log("end => ", end);
  console.log("oldStart => ", oldStart);

  switch (data.recurringType) {
    case "ONCE":
      console.log("HITTING ONCE FOR NEW");
      if (range.contains(moment(oldStart))) {
        throw new Error(
          `Your One off viewing would clash with the start date of another viewing ${viewing.id}`
        );
      }
      if (range.contains(moment(oldEnd))) {
        throw new Error(
          `Your One off viewing would clash with the end date of another viewing ${viewing.id}`
        );
      }
      break;
    case "DAILY":
      console.log("oldStartTime => ", oldStartTime);
      console.log("startTime => ", startTime);
      console.log("endTime => ", endTime);
      if (oldStartTime >= startTime && oldStartTime <= endTime) {
        throw new Error(
          `Your new Dailt Viewing would clash with viewings you already have commitments too ${viewing.id}`
        );
      }
      if (oldEndTime >= startTime && oldEndTime <= endTime) {
        throw new Error(
          `Your new Dailt Viewing would clash with viewings you already have commitments too ${viewing.id}`
        );
      }
      break;
    case "WEEKLY":
      var i = 0;
      while (i < 8) {
        var weeklyStart = moment(data.dateTime)
          .add(i, "weeks")
          .format();
        var weeklyEnd = moment(data.dateTime)
          .add(i, "weeks")
          .add(data.minutesFor, "minutes")
          .format();
        range = moment.range(weeklyStart, weeklyEnd);
        if (range.contains(moment(oldStart))) {
          throw new Error(
            `This weekly viewing would clash with another viewings start ${viewing.id}`
          );
        }
        if (range.contains(moment(oldEnd))) {
          throw new Error(
            `This weekly viewing would clash with another viewing before it has ended ${viewing.id}`
          );
        }
        i++;
      }
      break;
    case "FORTNIGHTLY":
      var i = 0;
      while (i < 8) {
        var weeklyStart = moment(data.dateTime)
          .add(i * 2, "weeks")
          .format();
        var weeklyEnd = moment(data.dateTime)
          .add(i * 2, "weeks")
          .add(data.minutesFor, "minutes")
          .format();
        range = moment.range(weeklyStart, weeklyEnd);
        if (range.contains(moment(oldStart))) {
          throw new Error(
            `This FORTNIGHTLY viewing would clash with another viewings start ${viewing.id}`
          );
        }
        if (range.contains(moment(oldEnd))) {
          throw new Error(
            `This FORTNIGHTLY viewing would clash with another viewing before it has ended ${viewing.id}`
          );
        }
        i++;
      }
      break;
    case "MONTHLY":
      var i = 0;
      while (i < 8) {
        var weeklyStart = moment(data.dateTime)
          .add(i, "months")
          .format();
        var weeklyEnd = moment(data.dateTime)
          .add(i, "months")
          .add(data.minutesFor, "minutes")
          .format();
        range = moment.range(weeklyStart, weeklyEnd);
        if (range.contains(moment(oldStart))) {
          throw new Error(
            `This MONTHLY viewing would clash with another viewings start ${viewing.id}`
          );
        }
        if (range.contains(moment(oldEnd))) {
          throw new Error(
            `This MONTHLY viewing would clash with another viewing before it has ended ${viewing.id}`
          );
        }
        i++;
      }
      break;
    default:
  }
}

// ToDo: ensure that when the viewing is destroyed, it leaves the connected
async function createViewing(parent, args, ctx, info) {
  const loggedInUserId = ctx.request.userId;

  if (!loggedInUserId) {
    throw new Error("You must be logged in!");
  }
  const { data } = args;

  // 1. a viewing will have 1 or more hosts (we want to track what viewings hosts have as to not create viewings with hosts that would clash)
  const hostIds = data.hosts.connect.map(host => host.id);

  for (const hostId of hostIds) {
    const hostViewings = await ctx.db.query.viewings({
      where: {
        hosts_some: {
          id_contains: hostId
        }
      }
    });

    for (const viewing of hostViewings) {
      await checkForViewingClash({
        viewing: viewing,
        data: data
      });
    }
  }

  // 2. get all viewings for users being added to the new viewing and make sure that they wouldnt clash
  // take into account recurring type etc and come up with a way that cross analyses the possibilities etc
  // add 15 mins to the viewing

  const newViewing = await ctx.db.mutation.createViewing(
    {
      data: {
        ...data
      }
    },
    info
  );

  // make sure we get the user and property id attached

  //   register new activity
  //   createActivity({
  //     ctx: ctx,
  //     data: {
  //       title: "Viewing created",
  //       content: `A new viewing has been created`,
  //       jsonObj: data,
  //       type: "CREATED_VIEWING",
  //       user: {
  //         connect: {
  //           id: loggedInUserId
  //         }
  //       },
  //       property: property
  //         ? {
  //             connect: {
  //               id: property.id
  //             }
  //           }
  //         : null
  //     }
  //   });

  return newViewing;
}

module.exports = createViewing;
