const Moment = require("moment");
const MomentRange = require("moment-range");
const moment = MomentRange.extendMoment(Moment);

/**
 *  https://github.com/rotaready/moment-range
 */
exports.checkForClashes = async function({
  ctx,
  hostIds,
  propertyId,
  data,
  excludeViewingIds,
}) {
  // ToDo: combine the hostViewings and propertyViewings and remove the duplicates and run the check for one array
  // check for host clashes
  for (const hostId of hostIds) {
    const hostViewings = await ctx.db.query.viewings({
      where: {
        hosts_some: {
          id_contains: hostId,
        },
      },
    });

    // ToDo: filter excludeViewingIds

    const filteredHostViewings = hostViewings.filter(
      (viewing) => !excludeViewingIds.includes(viewing.id)
    );

    for (const viewing of filteredHostViewings) {
      await checkForViewingClash({
        viewing: viewing,
        data: data,
      });
    }
  }

  // check for property clashes too
  if (propertyId) {
    const propertyViewings = await ctx.db.query.viewings({
      where: {
        property: {
          id: propertyId,
        },
      },
    });

    // ToDo: excludeViewingIds
    const filteredPropertyViewings = propertyViewings.filter(
      (viewing) => !excludeViewingIds.includes(viewing.id)
    );

    for (const viewing of filteredPropertyViewings) {
      await checkForViewingClash({
        viewing: viewing,
        data: data,
      });
    }
  }
};

function checkForViewingClash({ viewing, data }) {
  switch (viewing.recurringType) {
    case "ONCE":
      checkOnceViewing({ viewing: viewing, data: data });
      break;
    case "DAILY":
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
  while (i < 12) {
    var date = moment()
      .set({
        day: viewingDateTime.get("day"),
        hour: viewingDateTime.get("hour"),
        minute: viewingDateTime.get("minute"),
      })
      .add(i, "months")
      .format();
    let viewingData = {
      ...viewing,
      dateTime: date,
    };
    checkNewViewing({ viewing: viewingData, data: data });
    i++;
  }
}

function checkFortnightlyViewing({ viewing, data }) {
  var i = 0;
  const viewingDateTime = moment(viewing.dateTime);
  while (i < 8) {
    var date = moment()
      .set({
        day: viewingDateTime.get("day"),
        hour: viewingDateTime.get("hour"),
        minute: viewingDateTime.get("minute"),
      })
      .add(i * 2, "weeks")
      .format();
    let viewingData = {
      ...viewing,
      dateTime: date,
    };
    checkNewViewing({ viewing: viewingData, data: data });
    i++;
  }
}

function checkWeeklyViewing({ viewing, data }) {
  var i = 0;
  const viewingDateTime = moment(viewing.dateTime);
  // hmm to be full accurate its actually 52...
  // also havnt thought about t but may be more complicated for fronigth and monthly
  // I will addreess all these properly when I feel like I have Sign(requires sign)
  // 51 coz of a funny rounding feeling on the calendar, and what and edge case if reverese
  while (i < 51) {
    // while (i < 8) {
    var date = moment()
      .set({
        day: viewingDateTime.get("day"),
        hour: viewingDateTime.get("hour"),
        minute: viewingDateTime.get("minute"),
      })
      .add(i, "weeks")
      .format();
    let viewingData = {
      ...viewing,
      dateTime: date,
    };
    checkNewViewing({ viewing: viewingData, data: data });
    i++;
  }
}

function checkDailyViewing({ viewing, data }) {
  var i = 0;
  var time = moment(viewing.dateTime, "HH:mm");
  while (i < 7) {
    var date = moment()
      .set({
        hour: time.get("hour"),
        minute: time.get("minute"),
      })
      .add(i, "days")
      .format();
    let viewingData = {
      ...viewing,
      dateTime: date,
    };
    checkNewViewing({ viewing: viewingData, data: data });
    i++;
  }
}

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

  switch (data.recurringType) {
    case "ONCE":
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
