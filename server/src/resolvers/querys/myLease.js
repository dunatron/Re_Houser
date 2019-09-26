async function myLease(parent, args, ctx, info) {
  const myLease = await ctx.db.query.propertyLease(
    {
      where: {
        ...args.where
      }
    },
    info
  );
  return myLease;
}

module.exports = myLease;
