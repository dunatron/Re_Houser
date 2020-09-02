const {
  updatePropertySearchNode,
} = require("../../lib/algolia/propertySearchApi");
const { createActivity } = require("../../lib/createActivity");

async function updateProperty(parent, args, ctx, info) {
  // first take a copy of the updates
  const loggedInUserId = ctx.request.userId;
  // need to be logged in
  if (!loggedInUserId) {
    throw new Error("You must be logged in!");
  }

  const updates = { ...args };
  const where = { id: args.id };
  // remove the ID from the updates
  delete updates.id;

  const item = await ctx.db.query.property(
    { where },
    `{ id location images {id url} insulationForm {id} insulationStatementFile {id} }`
  );

  if (updates.files) {
  }

  if (!item.insulationForm && updates.data.onTheMarket) {
    if (!item.insulationStatementFile) {
      throw new Error(
        "You need an Insulation Statement before your property can go on the market"
      );
    }
  }

  createActivity({
    ctx: ctx,
    data: {
      title: "Updated Property",
      content: `Property fields updated:`,
      jsonObj: updates,
      type: "UPDATED_PROPERTY",
      user: {
        connect: {
          id: loggedInUserId,
        },
      },
      property: {
        connect: {
          id: args.id,
        },
      },
    },
  });
  if (args.data.onTheMarket) {
    const live = args.data.onTheMarket;
    createActivity({
      ctx: ctx,
      data: {
        title: live
          ? "Property is now on the market"
          : "Property has been taken off the market",
        content: live
          ? "Property is now on the market"
          : "Property has been taken off the market",
        jsonObj: updates,
        type: live ? "PROPERTY_LIVE" : "PROPERTY_DRAFT",
        user: {
          connect: {
            id: loggedInUserId,
          },
        },
        property: {
          connect: {
            id: args.id,
          },
        },
      },
    });
  }

  // we need to await
  const updatedProperty = await ctx.db.mutation.updateProperty(
    {
      updates,
      where: {
        id: args.id,
      },
    },
    info
  );

  /**
   * activate the ciode highligting below is not used sao just do the func and dont put it into a variable
   */
  const propertySearchNode = updatePropertySearchNode({
    updates: updates,
    propertyId: args.id,
    ctx,
  });

  return updatedProperty;
}

module.exports = updateProperty;
