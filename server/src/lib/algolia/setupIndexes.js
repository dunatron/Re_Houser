const { ALL_INDEXES } = require("./indexesConf");

const algoliasearch = require("algoliasearch");
require("dotenv").config({ path: "./variables.env" });

// instantiate algoliaSearchClient
const client = algoliasearch(
  process.env.ALGOLIA_APPLICATION_ID,
  process.env.ALGOLIA_API_KEY,
  {
    timeout: 4000
  }
);

const setupIndexes = async () => {
  for (i of ALL_INDEXES) {
    const index = client.initIndex(`${process.env.SEARCH_STAGE}_${i.name}`);
    await index.setSettings(i.attributes);
  }
};

module.exports = setupIndexes;
