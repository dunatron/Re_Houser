async function properties(parent, args, ctx, info) {
  return ctx.db.query.properties({ where: { onTheMarket: true } }, info);
}

module.exports = properties;
