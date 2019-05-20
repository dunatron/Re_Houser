import algoliasearch from "algoliasearch/lite"

import {
  InstantSearch,
  Highlight,
  Configure,
  connectSearchBox,
  RefinementList,
  connectRefinementList,
  connectHierarchicalMenu,
  connectSortBy,
  connectInfiniteHits,
  connectCurrentRefinements,
} from "react-instantsearch-dom"

// const searchClient = algoliasearch(
//   "latency",
//   "6be0576ff61c053d5f9a3225e2a90f76"
// )

const searchClient = algoliasearch(
  "4QW4S8SE3J",
  "506b6dcf7516c20a1789e6eb9d9a5b39"
)

var applicationId = "4QW4S8SE3J"
var apiKey = "506b6dcf7516c20a1789e6eb9d9a5b39"

const App = () => (
  // <InstantSearch searchClient={searchClient} indexName="instant_search">
  //   <RefinementList attribute="brand" />
  // </InstantSearch>
  <InstantSearch searchClient={searchClient} indexName="dev_PropertySearch">
    <RefinementList attribute="rent" />
  </InstantSearch>
)

export default App
