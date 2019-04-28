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
    `{ owner{id} applicants{email user{email}} }`
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

  application.applicants.forEach((applicant, i) => {
    console.log(" YOOOO WE HAVE AN APPLICANT DUDE")
    console.log("applicantemail => ", applicant.email)
    console.log("applicantemail => ", applicant.user.email)
    transport.sendMail({
      from: "heath.dunlop.hd.@gmail.com",
      to: applicant.user.email,
      subject: "Application stage: PENDING",
      html: makeANiceEmail(`Your application is now in the pending stage, you will recieve an email when the landlord has actioned your application!
      \n\n`),
    })
  })

  // sandwiches.forEach(function (sandwich, index) {
  //   console.log(sandwich); // The element
  //   console.log(index); // The index in the NodeList
  // });

  // const mailRes = await transport.sendMail({
  //   from: "heath.dunlop.hd.@gmail.com",
  //   to: "heath.dunlop.hd.@gmail.com",
  //   subject: "Application stage: PENDING",
  //   html: makeANiceEmail(`Your application is now in the pending stage, you will recieve an email when the landlord has actioned your application!
  //   \n\n`),
  // })

  console.log("updatedApplicationStage ====> ", updatedApplication)

  // return the application
  return updatedApplication
}

module.exports = completeRentalApplication
