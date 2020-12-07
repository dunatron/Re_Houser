const { createActivity } = require("../../lib/createActivity");
const requestAppraisalEmail = require("../../lib/emails/requestAppraisalEmail");
const emailCEO = require("../../lib/emails/emailCEO");

async function createRentalAppraisal(parent, args, ctx, info) {
  const loggedInUserId = ctx.request.userId;

  // rooms: 2,
  // bathrooms: 2,
  // garageSpaces: 2,
  // acceptTerms: true,
  // placeId: 'Ei05OSBCbG9vZCBEb25vcnMsIEVwc29tLCBBdWNrbGFuZCwgTmV3IFplYWxhbmQiLiosChQKEgkJiUu3YkgNbRENLpQiZuE5vRIUChIJA88kxJ1IDW0RIMKiQ2HvAAU',
  // location: '99 Blood Donors, Epsom, Auckland, New Zealand',
  // locationLat: -36.8819512,
  // locationLng: 174.7841836,
  // heatSources: { set: [ 'ELECTRIC_HEATER', 'HEAT_PUMP' ] },
  // requestedBy: { connect: { id: 'ckidscsn8kmxb0a2679sj9e2x' } },
  // hasBeenUsed: false,
  // property: null

  const { data } = args;
  const { property, requestedBy } = data;

  const currentUser = await ctx.db.query.user(
    {
      where: {
        id: loggedInUserId
      }
    },
    `{id, email, firstName, lastName}`
  );

  if (!loggedInUserId) {
    throw new Error("You must be logged in!");
  }

  const rentalAppraisal = await ctx.db.mutation.createRentalAppraisal(
    {
      data: {
        ...data
      }
    },
    info
  );

  createActivity({
    ctx: ctx,
    data: {
      title: "Requested Property Appraisal",
      content: `A new request for a property appraisal has been sent`,
      jsonObj: data,
      type: "CREATED_PROPERTY_APPRAISAL",
      user: {
        connect: {
          id: loggedInUserId
        }
      },
      property: property
        ? {
            connect: {
              id: property.id
            }
          }
        : null
    }
  });

  // send email
  requestAppraisalEmail({
    toEmail: currentUser.email,
    user: currentUser,
    location: data.location,
    appraisal: rentalAppraisal
  });

  // email CEO
  emailCEO({
    ctx: ctx,
    subject: `New rental appraisal ${rentalAppraisal.id}`,
    from: {
      name: "RH Appraisal Requested",
      address: process.env.MAIL_USER
    },
    body: `a new rental appraisal has been requested for ${data.location}. Go to the platform to check it out in the /admin/appraisals`
  });

  return rentalAppraisal;
}

module.exports = createRentalAppraisal;
