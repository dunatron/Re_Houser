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
  const loggedInUserId = ctx.request.userId;
  console.log("loggedInUserId => ", loggedInUserId);
  // need to be logged in
  if (!loggedInUserId) {
    throw new Error("You must be logged in!");
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

  console.log("before createPropertyMutation");
  try {
    // const property = await ctx.db.mutation.createProperty(
    //   {
    //     data: {
    //       ...data,
    //       lowestRoomPrice,
    //       highestRoomPrice,
    //       rent: averageRoomPrice,
    //       rooms: numberOfRooms
    //       // images: {
    //       //   connect: connectFileIds,
    //       // },
    //     }
    //   },
    //   info
    // );
    // createProperty(data:{
    //   type: HOUSE,
    //   rooms: 2,
    //   useAdvancedRent: false,
    //   bathrooms: 2,
    //   garageSpaces: 2,
    //   carportSpaces: 2,
    //   offStreetSpaces: 2,
    //   rent: 70000,
    //   moveInDate: "2020-04-11",
    //   expiryDate: "2020-04-16",
    //   onTheMarket: false,
    //   location: "Pisa Moorings Road, Mount Pisa, New Zealand",
    //   locationLat: -44.9776393,
    //   locationLng: 169.2386795,
    //   tenancyType: FIXED,
    //   petsAllowed: true,
    //   maximumOccupants: 2,
    //   indoorFeatures: {
    //      set: [
    //       DISHWASHER,
    //       BALCONY
    //   ]},
    //   outdoorFeatures:{
    //     set:[
    //       OUTDOOR_SPA,
    //       PET_FRIENDLY
    //     ]
    //   },
    //   heatSources: {
    //     set:[
    //       HEAT_PUMP
    //     ]
    //   },
    //   pets: {
    //     set:[
    //       CAT
    //     ]
    //   },
    //   chattels:{
    //     set:[
    //       BLINDS,
    //       WALL_HEATER
    //     ]
    //   },
    //   insulationForm:{

    //   },
    //   owners:{
    //     connect:[
    //       {
    //         id: "ckblp3kct006l0765dofn69ts"
    //       }
    //     ]
    //   },
    //   creator:{
    //     connect:{
    //       id: "ckblp3kct006l0765dofn69ts"
    //     }
    //   }
    // }) {
    //   id
    // }
    // const property = await ctx.db.mutation.createProperty(
    //   {
    //     data: {
    //       ...data
    //     }
    //   },
    //   info
    // );
    const property = await ctx.db.mutation.createProperty(
      {
        data: {
          type: HOUSE,
          rooms: 2,
          useAdvancedRent: false,
          bathrooms: 2,
          garageSpaces: 2,
          carportSpaces: 2,
          offStreetSpaces: 2,
          rent: 70000,
          moveInDate: "2020-04-11",
          expiryDate: "2020-04-16",
          onTheMarket: false,
          location: "Pisa Moorings Road, Mount Pisa, New Zealand",
          locationLat: -44.9776393,
          locationLng: 169.2386795,
          tenancyType: FIXED,
          petsAllowed: true,
          maximumOccupants: 2,
          indoorFeatures: {
            set: [DISHWASHER, BALCONY]
          },
          outdoorFeatures: {
            set: [OUTDOOR_SPA, PET_FRIENDLY]
          },
          heatSources: {
            set: [HEAT_PUMP]
          },
          pets: {
            set: [CAT]
          },
          chattels: {
            set: [BLINDS, WALL_HEATER]
          },
          insulationForm: {},
          owners: {
            connect: [
              {
                id: "ckblp3kct006l0765dofn69ts"
              }
            ]
          },
          creator: {
            connect: {
              id: "ckblp3kct006l0765dofn69ts"
            }
          }
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
  } catch (e) {
    console.log("createProperty err => ", e);
    throw new Error("An error occurred trying to create your property");
  }
}

module.exports = createProperty;
