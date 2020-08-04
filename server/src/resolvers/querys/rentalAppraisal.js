async function rentalAppraisal(parent, args, ctx, info) {
  // GOing to need to rethink this. Method to get applicants_some is of type RentalGroupApplicant
  const userId = ctx.request.userId;
  //   if (!userId) {
  //     throw new Error("You must be logged in to get your rental appraisal!");
  //   }

  const where = {
    ...args.where,
  };
  return ctx.db.query.rentalAppraisal(
    {
      where: where,
    },
    info
  );
}

module.exports = rentalAppraisal;
