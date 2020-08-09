const { createActivity } = require("../../lib/createActivity");
const requestAppraisalEmail = require("../../lib/emails/requestAppraisalEmail");
const emailCEO = require("../../lib/emails/emailCEO");

async function createRentalAppraisal(parent, args, ctx, info) {
  const loggedInUserId = ctx.request.userId;
  const { data } = args;
  const { property, requestedBy } = data;

  const currentUser = await ctx.db.query.user(
    {
      where: {
        id: loggedInUserId,
      },
    },
    `{id, email, firstName, lastName}`
  );

  // creates a new message

  // 1. if no property linked then its a free appraisalq with no link, but we send email
  // maybe have an acceptAppraisal, an option to auto change rent with appraisal data on accept
  // accpet and dont update rental data

  // if propertyId, get the property, create appraisal with property
  // only us and landlord can see appraisals. because the world seems to distain transparency, like create more like

  // need to be logged in
  if (!loggedInUserId) {
    throw new Error("You must be logged in!");
  }

  const rentalAppraisal = await ctx.db.mutation.createRentalAppraisal(
    {
      data: {
        ...data,
      },
    },
    info
  );

  // register new activity
  createActivity({
    ctx: ctx,
    data: {
      title: "Requested Property Appraisal",
      content: `A new request for a property appraisal has been sent`,
      jsonObj: data,
      type: "CREATED_PROPERTY_APPRAISAL",
      user: {
        connect: {
          id: loggedInUserId,
        },
      },
      property: property
        ? {
            connect: {
              id: property.id,
            },
          }
        : null,
    },
  });

  // send email
  requestAppraisalEmail({
    toEmail: currentUser.email,
    user: currentUser,
    // rentalApplication: rentalApplication,
  });

  // email CEO
  emailCEO({
    ctx: ctx,
    subject: `New rental appraisal ${rentalAppraisal.id}`,
    body: `a new rental appraisal has been requested. Go to the platform to check it out in the /admin/appraisals`,
  });

  return rentalAppraisal;
}

module.exports = createRentalAppraisal;
