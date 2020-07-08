const Moment = require("moment");
const MomentRange = require("moment-range");
const moment = MomentRange.extendMoment(Moment);
const { createActivity } = require("../../lib/createActivity");

// https://github.com/rotaready/moment-range
async function checkForViewingClash({ viewing, data }) {
  console.log("New viewing Data => ", data);
  console.log("System viewing Data => ", viewing);

  switch (viewing.recurringType) {
    case "ONCE":
      console.log("VIEWING IS RECURE ONCE");
      checkOnce({ viewing: viewing, data: data });
      break;
    case "DAILY":
      break;
    case "WEEKLY":
      break;
    case "FORTNIGHTLY":
      break;
    case "MONTHLY":
      break;
    default:
  }
}

// moment()
//     .subtract(3, "month")
//     .format(),
// viewing is One time only
async function checkOnce({ viewing, data }) {
  switch (data.recurringType) {
    case "ONCE":
      const testDate = moment("2011-04-16", "YYYY-MM-DD");

      //   const start = moment("2011-04-15", "YYYY-MM-DD");
      //   const end = moment("2011-04-17", "YYYY-MM-DD");
      const start = moment("2011-04-15").format();
      const end = moment("2011-04-17").format();
      console.log("start => ", start);
      console.log("end => ", end);
      const range = moment.range(start, end);

      if (range.contains(testDate)) {
        console.log("RANGE CONTAINS");
      } else {
        console.log("RANGE !CONTAINS");
      }

      //   console.log("== COMPARE ONCE & ONCE ==");
      //   const newStart = moment(data.dateTime).format();
      //   const newEnd = moment(data.dateTime)
      //     // .add(data.minutesFor, "minutes")
      //     .format();

      //   const oldStart = moment(viewing.dateTime).format();
      //   const oldEnd = moment(viewing.dateTime)
      //     .add(viewing.minutesFor, "minutes")
      //     .format();

      //   const oldRange = moment().range(oldStart, oldEnd);

      //   console.log("newStart => ", newStart);
      //   console.log("newEnd => ", newEnd);
      //   console.log("oldStart => ", oldStart);
      //   console.log("oldEnd => ", oldEnd);

      //   //   console.log("Old range => ", oldRange);

      //   if (oldRange.contains(newStart)) {
      //     // the start off this viewing would conflict with start this viewing for host blah blah
      //     console.log(
      //       "Your start time would conflict with another viewing for user "
      //     );
      //   } else {
      //     console.log("NO CONFLICT");
      //   }
      //   if (oldRange.contains(newEnd)) {
      //     // the end off this viewing would conflict with
      //     console.log(
      //       "Your end time would conflict with another viewing for user"
      //     );
      //   }

      //   const interval = "month";
      //   const count = 4;
      //   //   const date = moment("2017-07-20");
      //   const date = moment("2017-07-20").format();

      //   const range1 = moment.rangeFromInterval(interval, count, date); // moment.range('2017-07-20', '2017-11-20')
      //   const range2 = moment.rangeFromInterval("month", -2, date); // moment.range('2017-05-20', '2017-07-20')

      //   console.log("Documentation range1 => ", range1);
      //   console.log("Documentation range2 => ", range2);

      break;
    case "DAILY":
      break;
    case "WEEKLY":
      break;
    case "FORTNIGHTLY":
      break;
    case "MONTHLY":
      break;
    default:
  }
}

// ToDo: ensure that when the viewing is destroyed, it leaves the connected
async function createViewing(parent, args, ctx, info) {
  //   const loggedInUserId = ctx.request.userId;

  //   if (!loggedInUserId) {
  //     throw new Error("You must be logged in!");
  //   }
  const { data } = args;

  // 1. a viewing will have 1 or more hosts (we want to track what viewings hosts have as to not create viewings with hosts that would clash)

  const hostIds = data.hosts.connect.map(host => host.id);
  console.log("hostIds => ", hostIds);

  hostIds.forEach(async hostId => {
    // get the host and all there viewings
    const hostViewings = await ctx.db.query.viewings({
      where: {
        hosts_some: {
          id_contains: hostId
        }
      }
    });

    hostViewings.forEach(async viewing => {
      checkForViewingClash({
        viewing: viewing,
        data: data
      });
    });

    // loop over viewings.

    // do we loop ofer for this type and check all possibles
    // or all possibles checking this type in question and if its data would clash

    // so loop over all the types
    // for its type see if a date would clash on it
    console.log("hostViewings => ", hostViewings);
  });

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
