const { transport, makeANiceEmail } = require("../../lib/mail");

async function completeRentalApplication(parent, { applicationId }, ctx, info) {
  const loggedInUser = ctx.request.userId;

  // need to be logged in
  if (!loggedInUser) {
    throw new Error("You must be logged in!");
  }

  // get application owner id
  const application = await ctx.db.query.rentalApplication(
    {
      where: {
        id: applicationId
      }
    },
    // {},
    `{ owner{id} applicants{email user{email, firstName, lastName}} }`
  );
  // check that loggedInUser is the owner of the application
  if (loggedInUser !== application.owner.id) {
    throw new Error(
      "You must be the application owner to complete the application!"
    );
  }

  // set the stage to complete by making a mutation
  const updatedApplication = await ctx.db.mutation.updateRentalApplication(
    {
      where: {
        id: applicationId
      },
      data: {
        stage: "PENDING"
      }
    },
    info
  );

  application.applicants.forEach((applicant, i) => {
    transport.sendMail({
      from: process.env.MAIL_USER,
      to: applicant.user.email,
      subject: "Application stage: PENDING",
      html: makeANiceEmail(
        `Your application is now in the pending stage, you will recieve an email when the landlord has actioned your application!
      \n\n`,
        applicant
      )
    });
  });

  // return the application
  return updatedApplication;
}

module.exports = completeRentalApplication;
