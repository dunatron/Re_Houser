// https://www.algolia.com/doc/api-reference/widgets/instantsearch/react/
import React, { useEffect } from "react"
import ReactDOM from "react-dom"
import PropertyCard from "../PropertyCard/index"
import algoliasearch from "algoliasearch/lite"
// Need to include in SSR

import {
  InstantSearch,
  SearchBox,
  Hits,
  HitsPerPage,
  Highlight,
  connectHighlight,
  connectPagination,
  Pagination,
  RefinementList,
} from "react-instantsearch-dom"

import CustomSearchBox from "./CustomSearchBox"

var applicationId = "4QW4S8SE3J"
var apiKey = "506b6dcf7516c20a1789e6eb9d9a5b39"
const searchClient = algoliasearch(applicationId, apiKey)

const CustomHighlight = connectHighlight(({ highlight, attribute, hit }) => {
  const parsedHit = highlight({
    highlightProperty: "_highlightResult",
    attribute,
    hit,
  })

  return (
    <div>
      {parsedHit.map(part =>
        part.isHighlighted ? <mark>{part.value}</mark> : part.value
      )}
    </div>
  )
})

const customPagination = connectPagination({})

const Hit = ({ hit }) => (
  <div>
    <CustomHighlight attribute="id" hit={hit} />
    <PropertyCard property={hit} />
  </div>
)

const PropertySearch = () => {
  const indexSuffix = process.env.NODE_ENV === "development" ? "dev" : "prod"

  // will fire after initial render
  useEffect(() => {}, [])

  return (
    <div>
      <InstantSearch
        indexName={`PropertySearch_${indexSuffix}`}
        searchClient={searchClient}>
        <CustomSearchBox />
        <RefinementList attributeName="price" />
        <Pagination
          showFirst={true}
          showPrevious={true}
          defaultRefinement={2}
          showNext={true}
          showLast={true}
          padding={5}
        />
        <HitsPerPage
          defaultRefinement={5}
          items={[
            { value: 1, label: "Snipe Mode" },
            { value: 2, label: "Show 2 hits" },
            { value: 5, label: "Show 5 hits" },
            { value: 10, label: "Show 10 hits" },
            { value: 15, label: "Show 10 hits" },
          ]}
        />
        <Hits hitComponent={Hit} />
      </InstantSearch>
    </div>
  )
}

export default PropertySearch

/*
export default class PropertySearch extends Component {
  componentDidMount() {
    // require("instantsearch.css/themes/reset.css")
    // require("instantsearch.css/themes/algolia.css")
    // or include the full Algolia theme
  }
  render() {
    // process.env.NODE_ENV === "development" ? endpoint : prodEndpoint
    const indexSuffix = process.env.NODE_ENV === "development" ? "dev" : "prod"
    return (
      <div>
        <InstantSearch
          indexName={`PropertySearch_${indexSuffix}`}
          searchClient={searchClient}>
          <CustomSearchBox />
          <Pagination
            showFirst={true}
            showPrevious={true}
            defaultRefinement={2}
            showNext={true}
            showLast={true}
            padding={5}
          />
          <HitsPerPage
            defaultRefinement={5}
            items={[
              { value: 1, label: "Snipe Mode" },
              { value: 2, label: "Show 2 hits" },
              { value: 5, label: "Show 5 hits" },
              { value: 10, label: "Show 10 hits" },
              { value: 15, label: "Show 10 hits" },
            ]}
          />
          <Hits hitComponent={Hit} />
        </InstantSearch>
      </div>
    )
  }
}

*/

// export default PropertySearch
