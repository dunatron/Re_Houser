async function myRentalApplications(parent, args, ctx, info) {
  // GOing to need to rethink this. Method to get applicants_some is of type RentalGroupApplicant
  const loggedInUserId = ctx.request.userId;
  if (!loggedInUserId) {
    throw new Error("You must be logged in to get your properties!");
  }
  return ctx.db.query.rentalApplications(
    {
      where: {
        OR: [
          {
            applicants_some: {
              user: {
                id: loggedInUserId
              }
            }
          },
          {
            owner: {
              id: loggedInUserId
            }
          }
        ]
      }
    },
    info
  );
}

module.exports = myRentalApplications;
