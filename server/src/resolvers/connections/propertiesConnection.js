async function propertiesConnection(parent, args, ctx, info) {
  const result = await ctx.db.query.propertiesConnection(
    {
      ...args,
    },
    info
  );
  return result;
}

module.exports = propertiesConnection;
