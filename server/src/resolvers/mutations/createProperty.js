const { processUpload, deleteFile } = require("../../lib/fileApi");
const { createActivity } = require("../../lib/createActivity");
const {
  addPropertySearchNode,
} = require("../../lib/algolia/propertySearchApi");

var fs = require("fs"),
  path = require("path"),
  filePath = path.join(__dirname, "../lib/documents/test.docx");

async function createProperty(parent, { data, files }, ctx, info) {
  const loggedInUserId = ctx.request.userId;
  // need to be logged in
  if (!loggedInUserId) {
    throw new Error("You must be logged in to create a property!");
  }
  // const uploadedFiles = files
  //   ? await Promise.all(files.map((file) => processUpload(file, ctx)))
  //   : [];
  // const connectFileIds = uploadedFiles.map((file) => ({ id: file.id }));

  // this here is dependent on using accomodation & useAdvancedRent is true
  const numberOfRooms = data.useAdvancedRent
    ? accommodation.length
    : data.rooms;
  const roomPrices = data.useAdvancedRent
    ? data.accommodation.create.map((a, i) => a.rent)
    : [data.rent];
  // get lowest roomPrice
  const lowestRoomPrice = parseFloat(Math.min(...roomPrices));
  const highestRoomPrice = parseFloat(Math.max(...roomPrices));
  const averageRoomPrice =
    roomPrices.reduce((a, b) => a + b, 0) / roomPrices.length;

  try {
    console.log("before createPropertyMutation");
    // Note, something is going wrong with deploy:prod etc
    const property = await ctx.db.mutation.createProperty(
      {
        data: {
          ...data,
          lowestRoomPrice,
          highestRoomPrice,
          rent: averageRoomPrice,
          rooms: numberOfRooms,
          // images: {
          //   connect: connectFileIds,
          // },
        },
      },
      info
    );

    createActivity({
      ctx: ctx,
      data: {
        title: "Property Created",
        content: "You have created a new property, nice",
        type: "CREATED_PROPERTY",
        property: {
          connect: {
            id: property.id,
          },
        },
        user: {
          connect: {
            id: loggedInUserId,
          },
        },
      },
    });
    addPropertySearchNode({
      propertyId: property.id,
      ctx,
    });
    // wow maybe return the thing too......
    return property;
  } catch (e) {
    console.log("createProperty err => ", e);
    throw new Error("An error occurred trying to create your property");
  }
}

module.exports = createProperty;
