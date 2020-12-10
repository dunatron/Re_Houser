const { createActivity } = require("../../lib/createActivity");
const {
  addPropertySearchNode
} = require("../../lib/algolia/propertySearchApi");
const propertyCreatedEmail = require("../../lib/emails/propertyCreatedEmail");

var fs = require("fs"),
  path = require("path"),
  filePath = path.join(__dirname, "../lib/documents/test.docx");

async function createProperty(parent, { data }, ctx, info) {
  const loggedInUserId = ctx.request.userId;

  if (!loggedInUserId) {
    throw new Error("You must be logged in to create a property!");
  }

  console.log("createProperty: data => ", data);

  console.log("createProperty: info => ", info);

  const numberOfRooms = data.useAdvancedRent
    ? accommodation.length
    : data.rooms;
  const roomPrices = data.useAdvancedRent
    ? data.accommodation.create.map((a, i) => a.rent)
    : [data.rent / numberOfRooms];
  // get lowest roomPrice
  const lowestRoomPrice = parseFloat(Math.min(...roomPrices));
  const highestRoomPrice = parseFloat(Math.max(...roomPrices));

  try {
    const property = await ctx.db.mutation.createProperty(
      {
        data: {
          ...data,
          lowestRoomPrice,
          highestRoomPrice,
          rent: data.rent,
          rooms: numberOfRooms,
          rehouserManaged: true,
          isLeased: false,
          onTheMarket: false
        }
      },
      info
    );

    createActivity({
      ctx: ctx,
      data: {
        title: "Property Created",
        content: "You have created a new property, nice",
        type: "CREATED_PROPERTY",
        jsonObj: property,
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
      db: ctx.db
    });

    const user = ctx.db.query.user({
      where: {
        id: loggedInUserId
      }
    });

    // let admin know new property has been created. Frodo loves his leads. Ohh a lead
    propertyCreatedEmail({
      toEmail: "admin@rehouser.co.nz",
      user: user
    });

    console.log("createProperty: info => ", property);

    // wow maybe return the thing too......
    return property;
  } catch (e) {
    throw new Error(`An error occurred trying to create your property ${e}`);
  }
}

module.exports = createProperty;
