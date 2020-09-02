const { checkForClashes } = require("../../lib/clashings/clashingsAPI");

// ToDo: ensure that when the viewing is destroyed, it leaves the connected
async function createViewing(parent, args, ctx, info) {
  const loggedInUserId = ctx.request.userId;

  if (!loggedInUserId) {
    throw new Error("You must be logged in!");
  }
  const { data } = args;

  // 1. a viewing will have 1 or more hosts (we want to track what viewings hosts have as to not create viewings with hosts that would clash)
  const hostIds = data.hosts.connect.map(host => host.id);

  // wil bail out if there is a clash
  await checkForClashes({
    propertyId: data.property ? data.property.connect.id : null,
    hostIds: hostIds,
    data: data,
    ctx: ctx,
    excludeViewingIds: []
  });

  const newViewing = await ctx.db.mutation.createViewing(
    {
      data: {
        ...data
      }
    },
    info
  );

  return newViewing;
}

module.exports = createViewing;
