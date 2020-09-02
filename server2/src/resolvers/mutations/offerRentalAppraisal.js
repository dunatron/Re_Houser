const { createActivity } = require("../../lib/createActivity");
const offerRentalAppraisalEmail = require("../../lib/emails/offerRentalAppraisalEmail");

async function offerRentalAppraisal(parent, args, ctx, info) {
  const loggedInUserId = ctx.request.userId;
  const { data } = args;
  const { property, requestedBy } = data;

  // need to be logged in
  if (!loggedInUserId) {
    throw new Error("You must be logged in!");
  }

  // need user for email
  const user = await ctx.db.query.user(
    {
      where: {
        id: loggedInUserId
      }
    },
    `{id firstName lastName email}`
  );

  const updatedRentalAppraisal = await ctx.db.mutation.updateRentalAppraisal(
    {
      data: {
        ...data
      }
    },
    info
  );

  if (!property) {
    // there is no property so we must sen them to the add prooperty form via email
    // with the data attached so it can prefill the form yea
    offerRentalAppraisalEmail({
      ctx: ctx,
      appraisal: updatedRentalAppraisal,
      toEmail: updatedRentalAppraisal.requestedBy.email,
      user: user
    });
    // throw new Error("email should be sending");
  }

  return updatedRentalAppraisal;
}

module.exports = offerRentalAppraisal;
