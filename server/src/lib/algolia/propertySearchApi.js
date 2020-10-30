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

const index = client.initIndex(`${process.env.SEARCH_STAGE}_PropertySearch`);
const propertyQueryString = `{id, type, rooms, rent, bathrooms, accommodation{id ,roomSize, rent, expenses, description},lowestRoomPrice, highestRoomPrice, moveInDate, onTheMarket, isLeased, location, locationLat, locationLng, images{url}, carportSpaces, garageSpaces, offStreetSpaces, outdoorFeatures, indoorFeatures  }`;

const addPropertySearchNode = async function({ propertyId, db }) {
  const property = await db.query.property(
    {
      where: {
        id: propertyId
      }
    },
    propertyQueryString
  );
  const propertiesObjectArr = [];
  const moveInTimeStamp = moment(property.moveInDate).unix();

  const propertyObject = {
    objectID: property.id,
    id: property.id,
    type: property.type,
    rooms: property.rooms,
    bathrooms: property.bathrooms,
    accommodation: property.accommodation,
    lowestRoomPrice: property.lowestRoomPrice,
    highestRoomPrice: property.highestRoomPrice,
    rent: property.rent,
    moveInDate: property.moveInDate,
    move_in_date_timestamp: moveInTimeStamp,
    onTheMarket: property.onTheMarket,
    isLeased: property.isLeased,
    location: property.location,
    _geoloc: {
      lat: property.locationLat,
      lng: property.locationLng
    },
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
  index.addObjects(propertiesObjectArr).catch(e => {
    console.log("Error adding property to algolia: ", e);
  });

  // index.addObjects(propertiesObjectArr, function(err, content) {});
  return "ALL DONE HERE BRO";
};

const ALLOWED_SEARCH_NODE_UPDATE_KEYS = ["rent", "rooms", "moveInDate"];
/**
 *
 * ToDo: create a new searchUpdates object and push in data from updates only if the key is in one of
 * a specified array of allowed keys, also transform certain keys values, or rather, if we update date, mkae a timestamp and update that too
 */
const updatePropertySearchNode = async function({ property, propertyId, ctx }) {
  // db update runs before this so we just get the images and update the urls for algolia

  if (!property && !propertyId) {
    throw new Error(
      "You must supply the property or propertyId to updatePropertySearchNode"
    );
  }

  const data = property
    ? property
    : await ctx.db.query.property(
        {
          where: {
            id: propertyId
          }
        },
        propertyQueryString
      );

  const objects = [
    {
      ...data,
      objectID: data.id,
      ...(data.moveInDate && {
        move_in_date_timestamp: moment(data.moveInDate).unix()
      }),
      ...(data.moveInDate && {
        move_in_date_timestamp: moment(data.moveInDate).unix()
      }),
      ...(data.images && {
        imageUrls: data.images.map(image => image.url)
      })
    }
  ];

  index.partialUpdateObjects(objects, (err, content) => {
    if (err) throw err;
  });
  return "All done with search node updates";
};

module.exports = {
  addPropertySearchNode,
  updatePropertySearchNode
};
