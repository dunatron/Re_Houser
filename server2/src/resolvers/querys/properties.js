async function properties(parent, args, ctx, info) {
  // console.log("DO I have to rewrite all this shit? => ", ctx);
  // console.log("Test => parent", parent);
  // console.log("Test => args", args);
  // console.log("Test => ctx", ctx);
  // console.log("Test => info", info);
  // return [];
  // throw new Error("Ohh yea derp");
  // return [];
  return ctx.db.query.properties({ where: { onTheMarket: true } }, info);
}

module.exports = properties;
