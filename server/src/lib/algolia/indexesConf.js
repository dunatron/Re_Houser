const PROPERTY_INDEX = {
  name: "PropertySearch",
  attributes: {
    searchableAttributes: [
      "location",
      "rent",
      "lowestRoomPrice",
      "highestRoomPrice",
      "rooms",
      "move_in_date_timestamp",
      "accommodation"
    ],
    // Define business metrics for ranking and sorting
    customRanking: ["desc(popularity)"],
    // Set up some attributes to filter results on
    attributesForFaceting: [
      "rooms",
      "rent",
      "indoorFeatures",
      "outdoorFeatures",
      "type",
      "onTheMarket",
      "lowestRoomPrice",
      "highestRoomPrice"
    ]
  }
};

const USER_INDEX = {
  name: "UserSearch",
  attributes: {
    searchableAttributes: ["email", "firstName", "lastName"],
    attributesForFaceting: ["permissions"]
  }
};

const ALL_INDEXES = [PROPERTY_INDEX, USER_INDEX];

module.exports = { ALL_INDEXES, PROPERTY_INDEX, USER_INDEX };
