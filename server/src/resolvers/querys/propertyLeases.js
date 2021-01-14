async function propertyLeases(parent, args, ctx, info) {
  console.log("ARgs for propertLease Query => ", args);

  return await ctx.db.query.propertyLeases(
    {
      ...args,
      where: {
        ...args.where
      }
    },
    info
  );
}

module.exports = propertyLeases;
