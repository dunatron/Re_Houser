//acceptRentalApplication

const { transport, makeANiceEmail } = require("../../lib/mail");
const createPropertyLease = require("./createPropertyLease");

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

  // set the stage to complete by making a mutation
  ctx.db.mutation.updateRentalApplication(
    {
      where: {
        id: applicationId
      },
      data: {
        stage: "ACCEPTED"
      }
    },
    info
  );

  // create the new lease and await for the PropertyLease entity to return
  const lease = await createPropertyLease(
    parent,
    {
      data: {
        location: property.location,
        locationLat: property.locationLat,
        locationLng: property.locationLng,
        rooms: property.rooms,
        rent: property.rent,
        bathrooms: property.bathrooms,
        finalised: false,
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

  const leaseLink = `<a href="${process.env.FRONTEND_URL}/my/lease?id=${lease.id}">To the Lease</a>`;

  // send emails to the potential tenants about the accepted application and the new lease to sign
  lesseeUsers.forEach((user, i) => {
    // 1. email about the application stage being accepted
    transport.sendMail({
      from: process.env.MAIL_USER,
      to: user.email,
      subject: "Application stage: ACCEPTED",
      html: makeANiceEmail(`Your application is now in the ACCEPTED stage, This means that a lease has now been created where all tenants and the landlord need to sign!
      \n\n`)
    });
    // 2. email about the new lease that has been created and a link to it in the app
    transport.sendMail({
      from: process.env.MAIL_USER,
      to: user.email,
      subject: "New Lease: Signage Required",
      html: makeANiceEmail(`Congratulations you have been offered a new lease. Follow the link to accept the lease! ${leaseLink}
      \n\n`)
    });
  });
  // send emails to the owners about the new lease that needs to be signed!
  owners.forEach((user, i) => {
    transport.sendMail({
      from: process.env.MAIL_USER,
      to: user.email,
      subject: "New Lease: Signage Required",
      html: makeANiceEmail(`A new lease for your property has been created! head on over to the link to sign it ${leaseLink}
      \n\n`)
    });
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
