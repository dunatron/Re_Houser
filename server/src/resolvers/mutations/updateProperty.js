const {
  updatePropertySearchNode
} = require("../../lib/algolia/propertySearchApi");
const { processUpload, deleteFile } = require("../../lib/fileApi");
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
  // new file to update
  if (updates.file) {
    // get the old item data
    const item = await ctx.db.query.property(
      { where },
      `{ id title, image {id url} }`
    );
    if (item.image) {
      deleteFile({ id: item.image.id, url: item.image.url, ctx });
    }
    const uploadedFile = await processUpload(await updates.file, ctx);
    updates.image = {
      connect: {
        id: uploadedFile.id
      }
    };
  }
  delete updates.file;
  /**
   * activate the ciode highligting below is not used sao just do the func and dont put it into a variable
   */
  const propertySearchNode = updatePropertySearchNode({
    updates: updates,
    propertyId: args.id,
    ctx
  });

  createActivity({
    ctx: ctx,
    data: {
      title: "Updated Property",
      content: `Property fields updated:`,
      jsonObj: updates,
      type: "UPDATED_PROPERTY",
      user: {
        connect: {
          id: loggedInUserId
        }
      },
      property: {
        connect: {
          id: args.id
        }
      }
    }
  });
  return ctx.db.mutation.updateProperty(
    {
      updates,
      where: {
        id: args.id
      }
    },
    info
  );
}

module.exports = updateProperty;
