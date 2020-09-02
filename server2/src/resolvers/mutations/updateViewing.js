const { checkForClashes } = require("../../lib/clashings/clashingsAPI");

async function updateViewing(parent, { data, where }, ctx, info) {
  const hostIds = data.hosts.set.map(host => host.id);

  const viewingToUpdate = await ctx.db.query.viewing(
    {
      where
    },
    `id, property {id}`
  );

  await checkForClashes({
    // propertyId: data.property ? data.property.connect.id : null,
    propertyId: viewingToUpdate.property.id, // we will need to query and get the viewing first to get its propertyId...
    hostIds: hostIds,
    data: data,
    ctx: ctx,
    excludeViewingIds: [viewingToUpdate.id]
  });

  const viewing = await ctx.db.mutation.updateViewing(
    {
      data,
      where
    },
    info
  );
  return viewing;
}

module.exports = updateViewing;
