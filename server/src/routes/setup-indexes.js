const setupIndexes = require("../lib/algolia/setupIndexes");

const setupIndexesRoute = (req, res) => {
  setupIndexes();
  res.send("Algolia Indexes Initialized");
};

module.exports = setupIndexesRoute;
