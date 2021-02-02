async function contactSubmissionsConnection(parent, args, ctx, info) {
  const result = await ctx.db.query.contactSubmissionsConnection(
    {
      ...args,
    },
    info
  );
  return result;
}

module.exports = contactSubmissionsConnection;
