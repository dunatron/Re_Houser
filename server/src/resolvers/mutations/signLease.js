async function signLease(parent, args, ctx, info) {
  const { id, type, leaseId } = args;
  // 1. Query the current user and ma ke sure they are signed in
  // const { userId } = ctx.request.userId
  // if (!userId) throw new Error("You must be signed in to create a credit card")
  const loggedInUserId = await ctx.request.userId;
  // need to be logged in
  if (!loggedInUserId) {
    throw new Error("You must be logged in to sign any of your leases!");
  }

  const data = {
    update: {
      where: {
        id: id
      },
      data: {
        signed: true
      }
    }
  };

  const updateDataWithType =
    type === "LESSOR" ? { lessors: data } : { lessees: data };

  // const userType =

  /**
   * Doubly check that the user and lessee has everything valid for them
   */

  // const lease = await ctx.db.query.propertyLease()
  // just straight up make the mutation
  const signedLease = await ctx.db.mutation.updatePropertyLease({
    where: {
      id: leaseId
    },
    data: updateDataWithType
  });

  const message = {
    message: `Signing of lease ${leaseId} was successful`
  };

  return message;
}

module.exports = signLease;
