async function createRentalAppraisal(parent, args, ctx, info) {
  const { data } = args;
  // creates a new message

  // 1. if no property linked then its a free appraisalq with no link, but we send email
  // maybe have an acceptAppraisal, an option to auto change rent with appraisal data on accept
  // accpet and dont update rental data

  // if propertyId, get the property, create appraisal with property
  // only us and landlord can see appraisals. because the world seems to distain transparency, like create more like
  //

  const message = await ctx.db.mutation.createRentalAppraisal(
    {
      data: {
        ...data,
      },
    },
    info
  );

  return message;
}

module.exports = createRentalAppraisal;
