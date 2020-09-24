async function propertyLeasesConnection(parent, args, ctx, info) {
  const leasesRes = await ctx.db.query.propertyLeasesConnection(
    {
      ...args
    },
    info
  );
  return leasesRes;
}

module.exports = propertyLeasesConnection;
