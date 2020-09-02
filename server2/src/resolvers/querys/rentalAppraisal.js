async function rentalAppraisal(parent, args, ctx, info) {
  const userId = ctx.request.userId;
  const where = {
    ...args.where
  };
  return ctx.db.query.rentalAppraisal(
    {
      where: where
    },
    info
  );
}

module.exports = rentalAppraisal;
