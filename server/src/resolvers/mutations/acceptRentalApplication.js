//acceptRentalApplication

const { transport, makeANiceEmail } = require("../../lib/mail")

async function acceptRentalApplication(
  parent,
  { applicationId, propertyId },
  ctx,
  info
) {
  const loggedInUser = ctx.request.userId
  // need to be logged in
  if (!loggedInUser) {
    throw new Error("You must be logged in!")
  }

  // get application
  const application = await ctx.db.query.rentalApplication(
    {
      where: {
        id: applicationId,
      },
    },
    // {},
    `{ owner{id} applicants{email user{email}} }`
  )
  // get the Property
  const property = await ctx.db.query.property(
    { where: { id: propertyId } },
    `{owners{id}}`
  )
  // check that loggedInUser is one of the owners for the property
  ownerIds = property.owners.map(owner => owner.id)
  if (!ownerIds.includes(loggedInUser)) {
    throw new Error("You are not one of the owners!")
  }

  // set the stage to complete by making a mutation
  const updatedApplication = await ctx.db.mutation.updateRentalApplication(
    {
      where: {
        id: applicationId,
      },
      data: {
        stage: "ACCEPTED",
      },
    },
    info
  )
  // ToDo create a new Type {Lease}

  // Send EMails to the applicants informing them that the application has been completed
  /*
  application.applicants.forEach((applicant, i) => {
    transport.sendMail({
      from: "heathd@rehouser.co.nz",
      to: applicant.user.email,
      subject: "Application stage: ACCEPTED",
      html: makeANiceEmail(`Your application is now in the ACCEPTED stage, you will recieve an email when the landlord has actioned your application!
      \n\n`),
    })
  })
  */

  console.log("updatedApplicationStage ====> ", updatedApplication)

  // return the application
  return { message: "Congratulations You have created a new Lease" }
}

module.exports = acceptRentalApplication
