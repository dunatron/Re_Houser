const { processUpload, deleteFile } = require("../../lib/fileApi");
const { createActivity } = require("../../lib/createActivity");
const {
  addPropertySearchNode
} = require("../../lib/algolia/propertySearchApi");

var fs = require("fs"),
  path = require("path"),
  filePath = path.join(__dirname, "../lib/documents/test.docx");

async function createProperty(parent, { data, files }, ctx, info) {
  console.log("What is the data => ", data);
  // throw new Error("eat a dick nigga");
  const loggedInUserId = ctx.request.userId;
  // need to be logged in
  if (!loggedInUserId) {
    throw new Error("You must be logged in!");
  }
  const uploadedFiles = files
    ? await Promise.all(files.map(file => processUpload(file, ctx)))
    : [];
  const connectFileIds = uploadedFiles.map(file => ({ id: file.id }));

  // this here is dependent on using accomodation & useAdvancedRent is true
  const numberOfRooms = useAdvancedRent
    ? accommodation.length
    : data.numberOfRooms;
  const roomPrices = data.useAdvancedRent
    ? data.accommodation.create.map((a, i) => a.rent)
    : [data.rent];
  // get lowest roomPrice
  const lowestRoomPrice = parseFloat(Math.min(...roomPrices));
  const averageRoomPrice =
    roomPrices.reduce((a, b) => a + b, 0) / roomPrices.length;

  const property = await ctx.db.mutation.createProperty(
    {
      data: {
        ...data,
        lowestRoomPrice,
        highestRoomPrice,
        rent: averageRoomPrice,
        rooms: numberOfRooms,
        images: {
          connect: connectFileIds
        }
      }
    },
    info
  );
  // const propertySearchNode = addPropertySearchNode({
  //   propertyId: property.id,
  //   ctx,
  // })
  createActivity({
    ctx: ctx,
    data: {
      title: "Property Created",
      content: "You have created a new property, nice",
      type: "CREATED_PROPERTY",
      property: {
        connect: {
          id: property.id
        }
      },
      user: {
        connect: {
          id: loggedInUserId
        }
      }
    }
  });
  addPropertySearchNode({
    propertyId: property.id,
    ctx
  });
  // wow maybe return the thing too......
  return property;
}

module.exports = createProperty;
