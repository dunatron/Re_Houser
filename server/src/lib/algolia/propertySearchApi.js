var algoliasearch = require("algoliasearch")
require("dotenv").config({ path: "./variables.env" })

var applicationId = "4QW4S8SE3J"
var apiKey = "506b6dcf7516c20a1789e6eb9d9a5b39"

// instantiate algoliaSearchClient
var client = algoliasearch(applicationId, apiKey, {
  timeout: 4000,
})

// process.env.STAGE

// get/create PropertySearch index
// var index = client.initIndex("PropertySearch")
// var index = client.initIndex(`PropertySearch_${process.env.STAGE}`)
var index = client.initIndex(`${process.env.STAGE}_PropertySearch`)

// We need to apply our settings here!
index.setSettings({
  // Select the attributes you want to search in
  searchableAttributes: ["location", "price", "rooms"],
  // Define business metrics for ranking and sorting
  // customRanking: [
  //   'desc(popularity)'
  // ],
  // Set up some attributes to filter results on
  attributesForFaceting: [
    "rooms",
    "searchable(locationLat)",
    "searchable(locationLng)",
    "price",
    "indoorFeatures",
    "outdoorFeatures",
    "type",
    "onTheMarket",
    "moveInDate",
    "expiryDate",
  ],
})

var addPropertySearchNode = async function({ propertyId, ctx }) {
  console.group("===========addPropertySearchNode=============")

  const property = await ctx.db.query.property(
    {
      where: {
        id: propertyId,
      },
    },
    `{id, type, rooms, rent, moveInDate, onTheMarket, location, locationLat, locationLng, images{url}, carportSpaces, garageSpaces, offStreetSpaces, outdoorFeatures, indoorFeatures  }`
  )
  const propertiesObjectArr = []
  const propertyObject = {
    objectID: property.id,
    id: property.id,
    type: property.type,
    rooms: property.rooms,
    rent: property.rent,
    moveInDate: property.moveInDate,
    onTheMarket: property.onTheMarket,
    location: property.location,
    locationLat: property.locationLat,
    locationLng: property.locationLng,
    imageUrls: property.images.map(image => image.url),
    carportSpaces: property.carportSpaces,
    garageSpaces: property.garageSpaces,
    offStreetSpaces: property.offStreetSpaces,
    outdoorFeatures: property.outdoorFeatures, // If you add an array in the list of attributes to index, we extract and index all strings in the array.
    indoorFeatures: property.indoorFeatures, // https://www.algolia.com/doc/faq/index-configuration/do-you-support-indexing-of-arrays/
  }
  propertiesObjectArr.push(propertyObject)
  console.log("propertiesObjectArr => ", propertiesObjectArr)
  index.addObjects(propertiesObjectArr, function(err, content) {
    console.log(content)
    console.log("objectIDs=" + content.objectIDs)
  })
  // response is an object
  // {
  //   "objectIDs": [
  //     "myObjectID1",
  //     "myObjectID2"
  //   ],
  //   "taskID": 678,
  // }
  console.groupEnd()
  return "ALL DONE HERE BRO"
}

const ALLOWED_SEARCH_NODE_UPDATE_KEYS = ["rent", "rooms", "moveInDate"]
/**
 *
 * ToDo: create a new searchUpdates object and push in data from updates only if the key is in one of
 * a specified array of allowed keys
 */
const updatePropertySearchNode = async function({ updates, propertyId, ctx }) {
  console.log("updatePropertySearchNode updates  => ", updates)
  console.log("updatePropertySearchNode propertyId  => ", propertyId)
  const objects = [{ ...updates.data, objectID: propertyId }]
  index.partialUpdateObjects(objects, (err, content) => {
    if (err) throw err

    console.log("UPDated Search node content =-> ", content)
    console.log(content)
  })
  return "All done with search node updates"
}

module.exports = {
  addPropertySearchNode,
  updatePropertySearchNode,
}
