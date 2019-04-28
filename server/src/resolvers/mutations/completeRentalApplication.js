const { transport, makeANiceEmail } = require("../../lib/mail")

async function completeRentalApplication(parent, { applicationId }, ctx, info) {
  const loggedInUser = ctx.request.userId
  // need to be logged in
  if (!loggedInUser) {
    throw new Error("You must be logged in!")
  }

  // get application owner id
  const application = await ctx.db.query.rentalApplication(
    {
      where: {
        id: applicationId,
      },
    },
    // {},
    `{ owner{id} }`
  )
  console.log("application ====> ", application)
  // check that loggedInUser is the owner of the application
  if (loggedInUser !== application.owner.id) {
    throw new Error(
      "You must be the application owner to complete the application!"
    )
  }

  // set the stage to complete by making a mutation
  const updatedApplication = await ctx.db.mutation.updateRentalApplication(
    {
      where: {
        id: applicationId,
      },
      data: {
        stage: "PENDING",
      },
    },
    info
  )

  const mailRes = await transport.sendMail({
    from: "heath.dunlop.hd.com",
    to: "heath.dunlop.hd.com",
    subject: "Your Password Reset Token",
    html: makeANiceEmail(`Your Password Reset Token is here!
    \n\n`),
  })

  console.log("updatedApplicationStage ====> ", updatedApplication)

  // return the application
  return updatedApplication
}

module.exports = completeRentalApplication
