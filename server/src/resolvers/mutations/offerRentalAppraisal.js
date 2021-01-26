const { createActivity } = require("../../lib/createActivity");
const offerRentalAppraisalEmail = require("../../lib/emails/offerRentalAppraisalEmail");

async function offerRentalAppraisal(parent, args, ctx, info) {
  const loggedInUserId = ctx.request.userId;
  const { data, where } = args;
  const { property, requestedBy } = data;

  // need to be logged in
  if (!loggedInUserId) {
    throw new Error("You must be logged in!");
  }

  const appraisal = await ctx.db.query.rentalAppraisal(
    {
      where: {
        ...where
      }
    },
    `{ id requestedBy { id firstName lastName email } }`
  );

  // need to connect the appraiser
  // appraisedApplications: [RentalAppraisal]
  //   @relation(name: "UserAppraisalsAppraised")
  // appraisedBy: User @relation(name: "UserAppraisalsAppraised")
  const updatedRentalAppraisal = await ctx.db.mutation.updateRentalAppraisal(
    {
      data: {
        ...data,
        appraisedBy: {
          connect: {
            id: loggedInUserId
          }
        }
      },
      where: {
        ...where
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
      toEmail: appraisal.requestedBy,
      user: appraisal.requestedBy
    });
    // throw new Error("email should be sending");
  }

  return updatedRentalAppraisal;
}

module.exports = offerRentalAppraisal;
