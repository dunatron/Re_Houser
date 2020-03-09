//acceptRentalApplication

const { transport, makeANiceEmail } = require("../../lib/mail");
const createPropertyLease = require("./createPropertyLease");

/**
 * This will accept a rental application id changing it's status to DENIED if the user performing the action
 * is an owner of the property.
 * It will also create a PropertyLease which informs all the potential tenants and owners
 * @param {*} parent
 * @param {*} applicationId => is the id of the RentalApplication
 * @param {*} ctx
 * @param {*} info => is the info requested from the front-end for SuccessMessage
 */
async function declineRentalApplication(parent, { applicationId }, ctx, info) {
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
        stage: "DENIED"
      }
    },
    info
  );

  // send emails to the potential tenants about the accepted application and the new lease to sign
  lesseeUsers.forEach((user, i) => {
    // 1. email about the application stage being accepted
    transport.sendMail({
      from: process.env.MAIL_USER,
      to: user.email,
      subject: "Application stage: DENIED",
      html: makeANiceEmail(`Unfortunately your application has been DENIED. We encourage you to continue looking for other properties!
      \n\n`)
    });
  });
  // send emails to the owners about the new lease that needs to be signed!
  owners.forEach((user, i) => {
    transport.sendMail({
      from: process.env.MAIL_USER,
      to: user.email,
      subject: "Application Denied: Success",
      html: makeANiceEmail(`You have successfully declined an application for Property: ${property.location}
      \n\n`)
    });
  });

  return {
    message: "Application has been successfully denied"
  };
}

module.exports = declineRentalApplication;
