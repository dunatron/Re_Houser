require("dotenv").config({ path: "./variables.env" });
const algoliasearch = require("algoliasearch");
const moment = require("moment");

const client = algoliasearch(
  process.env.ALGOLIA_APPLICATION_ID,
  process.env.ALGOLIA_API_KEY,
  {
    timeout: 4000
  }
);

const index = client.initIndex(`${process.env.STAGE}_PropertySearch`);

const addPropertySearchNode = async function({ propertyId, ctx }) {
  const property = await ctx.db.query.property(
    {
      where: {
        id: propertyId
      }
    },
    `{id, type, rooms, rent, accommodation{id ,roomSize, rent, expenses, description},lowestRoomPrice, highestRoomPrice, moveInDate, onTheMarket, location, locationLat, locationLng, images{url}, carportSpaces, garageSpaces, offStreetSpaces, outdoorFeatures, indoorFeatures  }`
  );
  const propertiesObjectArr = [];
  const moveInTimeStamp = moment(property.moveInDate).unix();

  const propertyObject = {
    objectID: property.id,
    id: property.id,
    type: property.type,
    rooms: property.rooms,
    accommodation: property.accommodation,
    lowestRoomPrice: property.lowestRoomPrice,
    highestRoomPrice: property.highestRoomPrice,
    rent: property.rent,
    moveInDate: property.moveInDate,
    move_in_date_timestamp: moveInTimeStamp,
    onTheMarket: property.onTheMarket,
    location: property.location,
    locationLat: property.locationLat,
    locationLng: property.locationLng,
    imageUrls: property.images.map(image => image.url),
    carportSpaces: property.carportSpaces,
    garageSpaces: property.garageSpaces,
    offStreetSpaces: property.offStreetSpaces,
    outdoorFeatures: property.outdoorFeatures, // If you add an array in the list of attributes to index, we extract and index all strings in the array.
    indoorFeatures: property.indoorFeatures // https://www.algolia.com/doc/faq/index-configuration/do-you-support-indexing-of-arrays/
  };
  propertiesObjectArr.push(propertyObject);
  index.addObjects(propertiesObjectArr, function(err, content) {});
  return "ALL DONE HERE BRO";
};

const ALLOWED_SEARCH_NODE_UPDATE_KEYS = ["rent", "rooms", "moveInDate"];
/**
 *
 * ToDo: create a new searchUpdates object and push in data from updates only if the key is in one of
 * a specified array of allowed keys, also transform certain keys values, or rather, if we update date, mkae a timestamp and update that too
 */
const updatePropertySearchNode = async function({ updates, propertyId, ctx }) {
  // need to check for files and get there urls etc
  // 1. an update for files connect
  // 1. an update for files disconnect

  // https://medium.com/@mikeh91/conditionally-adding-keys-to-javascript-objects-using-spread-operators-and-short-circuit-evaluation-acf157488ede
  console.log("=====updatePropertySearchNode=====");
  console.log("updates => ", updates);

  var imageUrls;

  if (updates.data.images) {
    delete updates.data.images;
    const propertyImages = await ctx.db.query.property(
      {
        where: {
          id: propertyId
        }
      },
      `{ id images {id url}}`
    );

    imageUrls = propertyImages.property.images.map(p => p.images.url);

    // remove images
    // if (updates.data.images.disconnect) {
    //   // map over the disconnect
    // }
    // if (updates.data.images.connect) {
    //   // map over the disconnect
    // }
    // I think if we have images in the updates we have to fetch the properties images to get the urls and update them
  }

  const builtObj = buildAnObjectFromUpdateData(updates.data);

  console.log("Built Obj => ", builtObj);

  throw Error("===Just debugging algolia image updates===");

  const objects = [{ ...updates.data, objectID: propertyId }];
  index.partialUpdateObjects(objects, (err, content) => {
    if (err) throw err;
  });
  return "All done with search node updates";
};

const buildAnObjectFromUpdateData = data => ({
  ...(data.foo && { foo: data.foo }),
  ...(data.imageUrls && { imageUrls: data.images.map(img => img.url) })
});

module.exports = {
  addPropertySearchNode,
  updatePropertySearchNode
};
