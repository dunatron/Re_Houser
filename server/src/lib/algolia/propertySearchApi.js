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
var index = client.initIndex(`PropertySearch_${process.env.STAGE}`)

var addPropertySearchNode = async function({ propertyId, ctx }) {
  console.group("===========addPropertySearchNode=============")

  const property = await ctx.db.query.property(
    {
      where: {
        id: propertyId,
      },
    },
    `{id, rooms, rent, moveInDate, onTheMarket, location, locationLat, locationLng, images{url} }`
  )
  const propertiesObjectArr = []
  const propertyObject = {
    id: property.id,
    rooms: property.rooms,
    rent: property.rent,
    moveInDate: property.moveInDate,
    onTheMarket: property.onTheMarket,
    location: property.location,
    locationLat: property.locationLat,
    locationLng: property.locationLng,
    imageUrls: "url1, url2, url3",
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

module.exports = {
  addPropertySearchNode,
}
