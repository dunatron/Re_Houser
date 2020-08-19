const { createCard } = require("../../lib/paymentAPI");
const { createActivity } = require("../../lib/createActivity");

async function createPropertyLease(parent, { data }, ctx, info) {
  const loggedInUserId = await ctx.request.userId;

  // just highlohting we need to dp something herte
  const recievedData = data;

  const newLease = await ctx.db.mutation.createPropertyLease(
    {
      data: {
        ...recievedData,
        wallet: {
          create: {
            amount: 0
          }
        }
      }
    },
    info
  );

  const connectProperty = newLease.property
    ? {
        connect: {
          id: newLease.property.id
        }
      }
    : null;

  createActivity({
    ctx: ctx,
    data: {
      title: "Lease Created",
      content: "A new Property lease has been created",
      type: "CREATED_LEASE",
      propertyLease: {
        connect: {
          id: newLease.id
        }
      },
      user: {
        connect: {
          id: loggedInUserId
        }
      },
      property: connectProperty
    }
  });

  return newLease;
}

module.exports = createPropertyLease;
