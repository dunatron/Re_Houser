const { createCard } = require("../../lib/paymentAPI");

async function createPropertyLease(parent, { data }, ctx, info) {
  const loggedInUserId = await ctx.request.userId;

  console.log("==createPropertyLease==");
  console.log("==DATA==", data);

  // just highlohting we need to dp something herte
  const recievedData = data;

  const newLease = await ctx.db.mutation.createPropertyLease(
    // {
    //   data: recievedData
    // },
    {
      data: { ...recievedData }
    },
    // {},
    info
  );

  return newLease;
  // ToDo: user should also be proper owner or maybe admin
}

module.exports = createPropertyLease;
