async function payments(parent, args, ctx, info) {
  //  console.log()
  console.log("args => args => ", args);
  return ctx.db.query.payments({
    ...args
  });
}

module.exports = payments;
