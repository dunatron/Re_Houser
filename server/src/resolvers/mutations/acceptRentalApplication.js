//acceptRentalApplication

const { transport, makeANiceEmail } = require("../../lib/mail");
const createPropertyLease = require("./createPropertyLease");
const {
  newLeaseLesseeEmail,
  newLeaseLessorEmail
} = require("../../lib/emails/newLeaseEmail");

/**
 * This will accept a rental application changing it's status to ACCEPTED if the user performing the action
 * is an owner of the property.
 * It will also create a PropertyLease which informs all the potential tenants and owners
 * @param {*} parent
 * @param {*} applicationId => is the id of the RentalApplication
 * @param {*} ctx
 * @param {*} info => is the info requested from the front-end for PropertyLease
 */
async function acceptRentalApplication(parent, { applicationId }, ctx, info) {
  const loggedInUser = ctx.request.userId;
  // need to be logged in
  if (!loggedInUser) {
    throw new Error("You must be logged in!");
  }

  // get application
  const application = await ctx.db.query.rentalApplication(
    {
      where: {
        id: applicationId
      }
    },
    `{
      owner {
        id
      }
      leaseId
      applicants {
        id
        email 
        user {
          id
          email
        } 
      }
      property {
        id
        placeId
        location
        locationLat
        locationLng
        rooms
        rent
        bathrooms
        garageSpaces
        carportSpaces
        offStreetSpaces
        owners {
          id
          email
        } 
      }
    }`
  );

  // only createn 1 lease per accepting rentalApplication
  if (application.leaseId)
    throw new Error(
      `rental application already has a lease associated with it ${application.leaseId}`
    );

  // applicants will need to be filtered to the accepted applicants
  // extract data from RentalApplication
  const { applicants, property } = application;
  const { owners } = property;
  const ownerIds = property.owners.map(owner => owner.id);
  const lesseeUsers = applicants.map(applicant => applicant.user);

  // check that loggedInUser is one of the owners for the property
  if (!ownerIds.includes(loggedInUser)) {
    throw new Error("You are not one of the owners!");
  }

  // create the new lease and await for the PropertyLease entity to return
  const lease = await createPropertyLease(
    parent,
    {
      data: {
        placeId: property.placeId,
        location: property.location,
        locationLat: property.locationLat,
        locationLng: property.locationLng,
        rooms: property.rooms,
        rent: property.rent,
        bathrooms: property.bathrooms,
        stage: "INITIALIZING",
        garageSpaces: property.garageSpaces,
        carportSpaces: property.carportSpaces,
        offStreetSpaces: property.offStreetSpaces,
        property: {
          connect: {
            id: property.id
          }
        },
        lessors: {
          create: owners.map(owner => ({
            signed: false,
            user: { connect: { id: owner.id } }
          }))
        },
        lessees: {
          create: lesseeUsers.map(user => ({
            signed: false,
            user: { connect: { id: user.id } }
          }))
        }
      }
    },
    ctx,
    info
  );

  // set the stage to complete by making a mutation
  // also connect the loose prop of leaseId so we can direct people to the lease to sign
  ctx.db.mutation.updateRentalApplication(
    {
      where: {
        id: applicationId
      },
      data: {
        stage: "ACCEPTED",
        leaseId: lease.id
      }
    },
    info
  );

  const leaseLink = `<a href="${process.env.FRONTEND_URL}/my/lease?id=${lease.id}">To the Lease</a>`;

  // send emails to the potential tenants about the accepted application and the new lease to sign
  lesseeUsers.forEach((user, i) => {
    newLeaseLesseeEmail({ ctx: ctx, toEmail: user.email, lease: lease });
  });
  // send emails to the owners about the new lease that needs to be signed!
  owners.forEach((user, i) => {
    newLeaseLessorEmail({ ctx: ctx, toEmail: user.email, lease: lease });
  });

  // I wonder if we should remove all rentalApplications on a successful lease.
  // Yes we should do this, just not here. on finalisePropewrtyLease
  // we should delete all rentalApplications on the property
  // perhaps delete all groupChats
  // deleting all these things cleans things up on the property
  //

  return lease;
}

module.exports = acceptRentalApplication;
