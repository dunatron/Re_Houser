async function property(parent, args, ctx, info) {
  const requestedProperty = await ctx.db.query.property(
    {
      ...args
    },
    info
  );
  if (!requestedProperty) {
    throw new Error("Property does not exist");
    // throw new Error(
    //   "Was unable to retrieve property given the following arguments: " +
    //     JSON.stringify(args, null, 2)
    // );
  }
  return requestedProperty;
}

module.exports = property;
