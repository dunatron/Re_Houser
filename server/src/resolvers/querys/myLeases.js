async function myLeases(parent, args, ctx, info) {
  // GOing to need to rethink this. Method to get applicants_some is of type RentalGroupApplicant
  // if (!ctx.request.userId) {
  //   throw new Error("You must be logged in to get your properties!")
  // }
  const userId = ctx.request.userId;
  // We can only ever show leases where we are an owner or a tenant in that given lease
  // const where = {
  //   ...args.where,
  //   OR: [
  //     {
  //       owners_some: {
  //         id: userId,
  //       },
  //     },
  //     {
  //       tenants_some: {
  //         id: userId,
  //       },
  //     },
  //   ],
  // }
  const where = {
    ...args.where,
    OR: [
      {
        lessors_some: {
          user: {
            id: userId
          }
        }
      },
      {
        lessees_some: {
          user: {
            id: userId
          }
        }
      }
    ]
  };
  return ctx.db.query.propertyLeases(
    {
      where: where
    },
    info
  );
}

module.exports = myLeases;
