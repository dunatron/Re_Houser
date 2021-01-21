const { createCard } = require("../../lib/paymentAPI");
const { createActivity } = require("../../lib/createActivity");

const nanoid = require("nanoid");

async function createPropertyLease(parent, { data }, ctx, info) {
  const loggedInUserId = await ctx.request.userId;

  // just highlohting we need to dp something herte
  const recievedData = data;

  // for safety/UX especially in the future we should try get a property lease with bankRef.
  // if it is not = to null// whatever empty is, generate another bankRef/nanoid
  const bankRef = nanoid(7);

  const newLease = await ctx.db.mutation.createPropertyLease(
    {
      data: {
        bankRef: bankRef,
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
      // bankRef: newLease.bankRef,
      jsonObj: {
        bankRef: newLease.bankRef
      },
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
