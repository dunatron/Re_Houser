async function ownerProperties(parent, args, ctx, info) {
  // probably dont need to throw an error
  if (!ctx.request.userId) {
    throw new Error("You must be logged in to get your properties!");
  }
  return ctx.db.query.properties(
    {
      where: {
        owners_some: {
          id: ctx.request.userId
        }
      }
    },
    info
  );
}
module.exports = ownerProperties;
