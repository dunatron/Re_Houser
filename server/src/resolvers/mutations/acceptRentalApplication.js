//acceptRentalApplication

const { transport, makeANiceEmail } = require("../../lib/mail");
const createPropertyLease = require("./createPropertyLease");
const {
  newLeaseLesseeEmail,
  newLeaseLessorEmail,
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
        id: applicationId,
      },
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
        bondType
        leaseExpiryDate
        isLeased
        lastLeaseId
        tenancyType
        fixedLength
        moveInDate
        expiryDate
        bathrooms
        garageSpaces
        carportSpaces
        offStreetSpaces
        indoorFeatures
        outdoorFeatures
        petsAllowed
        pets
        maximumOccupants
        chattels
        owners {
          id
          email
        } 
        landlordProtectionCover
        freeGlassCover
        workingAlarms
        inHallway3mOfEachBedroom
        tenYearPhotoelectricAlarms
        alarmsEachLevel
      }
    }`
  );

  if (application.leaseId)
    throw new Error(
      `rental application already has a lease associated with it ${application.leaseId}`
    );

  const { applicants, property } = application;
  const { owners } = property;
  const ownerIds = property.owners.map((owner) => owner.id);
  const lesseeUsers = applicants.map((applicant) => applicant.user);

  // check that loggedInUser is one of the owners for the property
  if (!ownerIds.includes(loggedInUser)) {
    throw new Error("You are not one of the owners!");
  }

  // create the new lease and await for the PropertyLease entity to return
  const lease = await createPropertyLease(
    parent,
    {
      data: {
        stage: "INITIALIZING",
        property: {
          connect: {
            id: property.id,
          },
        },
        placeId: property.placeId,
        location: property.location,
        locationLat: property.locationLat,
        locationLng: property.locationLng,
        lessors: {
          create: owners.map((owner) => ({
            signed: false,
            user: { connect: { id: owner.id } },
          })),
        },
        lessees: {
          create: lesseeUsers.map((user) => ({
            signed: false,
            user: { connect: { id: user.id } },
          })),
        },
        rent: property.rent,
        bondType: property.bondType,
        tenancyType: property.tenancyType,
        rooms: property.rooms,
        maximumOccupants: property.maximumOccupants,
        bathrooms: property.bathrooms,
        garageSpaces: property.garageSpaces,
        carportSpaces: property.carportSpaces,
        offStreetSpaces: property.offStreetSpaces,
        indoorFeatures: {
          set: property.indoorFeatures,
        },
        outdoorFeatures: {
          set: property.outdoorFeatures,
        },
        moveInDate: property.moveInDate,
        expiryDate: property.expiryDate,
        leaseLengthInMonths: 12, // ToDo initially should maybe have a server function. let FE calc
        petsAllowed: property.petsAllowed,
        pets: {
          set: property.pets,
        },
        chattels: {
          set: property.chattels,
        },
        workingAlarms: property.workingAlarms,
        inHallway3mOfEachBedroom: property.inHallway3mOfEachBedroom,
        tenYearPhotoelectricAlarms: property.tenYearPhotoelectricAlarms,
        alarmsEachLevel: property.alarmsEachLevel,
        landlordProtectionCover: property.landlordProtectionCover,
        freeGlassCover: property.freeGlassCover,
      },
    },
    ctx,
    info
  );

  // set the stage to complete by making a mutation
  // also connect the loose prop of leaseId so we can direct people to the lease to sign
  ctx.db.mutation.updateRentalApplication(
    {
      where: {
        id: applicationId,
      },
      data: {
        stage: "ACCEPTED",
        leaseId: lease.id,
      },
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

  return lease;
}

module.exports = acceptRentalApplication;
