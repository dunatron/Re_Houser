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
  CurrentRefinements,
  RefinementList,
  SortBy,
  Stats,
  connectRefinementList,
  connectCurrentRefinements,
} from "react-instantsearch-dom"

import ConnectedCheckBoxRefinementList from "./refinements/CheckBoxList"

import {
  TextField,
  Checkbox,
  FormControlLabel,
  Subheader,
  List,
  ListItem,
  FlatButton,
  RaisedButton,
  MenuItem,
  Card,
  Divider,
  CardHeader,
  CardTitle,
  AppBar,
  FontIcon,
  IconMenu,
  Drawer,
  IconButton,
} from "@material-ui/core"

// import Button from "@material-ui/core/Button"

import CustomSearchBox from "./CustomSearchBox"

var applicationId = "4QW4S8SE3J"
var apiKey = "506b6dcf7516c20a1789e6eb9d9a5b39"
const searchClient = algoliasearch(applicationId, apiKey)

const indexPrefix = process.env.NODE_ENV === "development" ? "dev" : "prod"
const indexSuffix = process.env.NODE_ENV === "development" ? "dev" : "prod"

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

const Hit = ({ hit }) => (
  <div className="hit">
    {/* <div className="hit-image">
      <img src={hit.imageUrls} />
    </div> */}
    <div className="hit-location">
      <h1>{hit.location}</h1>
      {/* <Highlight attributeName={location} hit={hit} />
      <CustomHighlight attribute={"location"} hit={hit} /> */}
    </div>
  </div>
)

const Sidebar = () => (
  <div className="sidebar">
    <Drawer>
      <h1>Refinement goes here</h1>
      {/* <ConnectedCheckBoxRefinementList attribute="rooms" operator="or" />
      <RefinementList attribute="rooms" />
      <h1>Price</h1>
      <RefinementList attribute="price" />
      <h1>Location</h1>
      <RefinementList attribute="location" />
      <h1>rent</h1>
      <RefinementList attribute="rent" />
      <h1>City</h1>
      <RefinementList attribute="city" /> */}
      <h1>Type</h1>
      <RefinementList attribute="type" />
    </Drawer>
  </div>
)

const Content = () => (
  <div className="content">
    <div className="info">
      <Stats />
      Sort
      <SortBy
        defaultRefinement={`${indexPrefix}_PropertySearch`}
        items={[
          { value: `${indexPrefix}_PropertySearch`, label: "ohhh" },
          {
            value: `${indexPrefix}_PropertySearch_price_asc`,
            label: "Lowest Price",
          },
          {
            value: `${indexPrefix}_PropertySearch_price_desc`,
            label: "Highest Price",
          },
        ]}
      />
    </div>

    <Hits hitComponent={Hit} />
    <div className="pagination">
      <Pagination showLast={true} />
    </div>
  </div>
)

const PropertySearch = () => {
  // const indexSuffix = process.env.NODE_ENV === "development" ? "dev" : "prod"
  // const indexPrefix = process.env.NODE_ENV === "development" ? "dev" : "prod"

  // will fire after initial render
  useEffect(() => {}, [])

  return (
    <div>
      <InstantSearch
        indexName={`${indexPrefix}_PropertySearch`}
        searchClient={searchClient}>
        <header>
          <SearchBox translations={{ placeholder: "search for houses" }} />
        </header>
        <CurrentRefinements />
        <main>
          {/* <Sidebar /> */}
          <RefinementList attribute="type" />
          <Content />
        </main>
      </InstantSearch>
    </div>
  )
}

export default PropertySearch
