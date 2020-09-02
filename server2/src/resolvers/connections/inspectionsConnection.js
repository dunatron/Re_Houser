async function inspectionsConnection(parent, args, ctx, info) {
  const result = await ctx.db.query.inspectionsConnection(
    {
      ...args
    },
    info
  );
  return result;
}

module.exports = inspectionsConnection;
