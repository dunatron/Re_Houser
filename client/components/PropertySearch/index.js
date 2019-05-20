import React, { useState } from "react"
import algoliasearch from "algoliasearch/lite"
import PropTypes from "prop-types"
import classNames from "classnames"
import { withStyles } from "@material-ui/core/styles"
import Drawer from "@material-ui/core/Drawer"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import List from "@material-ui/core/List"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import InboxIcon from "@material-ui/icons/MoveToInbox"
import MailIcon from "@material-ui/icons/Mail"
import CustomSearchBox from "./CustomSearchBox"
import SettingsIcon from "../../styles/icons/SettingsIcon"
import CloseIcon from "../../styles/icons/CloseIcon"

import ConnectedCheckBoxRefinementList from "./refinements/CheckBoxList"
import PropertyCard from "../PropertyCard/index"

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

const drawerWidth = 240

var applicationId = "4QW4S8SE3J"
var apiKey = "506b6dcf7516c20a1789e6eb9d9a5b39"
const searchClient = algoliasearch(applicationId, apiKey)
const indexPrefix = process.env.NODE_ENV === "development" ? "dev" : "prod"

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
      <CustomHighlight attribute={"location"} hit={hit} />
    </div>
    <PropertyCard property={hit} />
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

const Sidebar = () => (
  <div className="sidebar">
    <div>
      <ConnectedCheckBoxRefinementList attribute="rooms" operator="or" />
      <ConnectedCheckBoxRefinementList attribute="type" operator="or" />
      <ConnectedCheckBoxRefinementList
        attribute="outdoorFeatures"
        operator="or"
      />
      <ConnectedCheckBoxRefinementList
        attribute="indoorFeatures"
        operator="or"
      />
      <ConnectedCheckBoxRefinementList attribute="price" operator="or" />
      {/* <RefinementList attribute="rooms" />
      <h1>Price</h1>
      <RefinementList attribute="price" />
      <RefinementList attribute="city" />
      <h1>Type</h1>
      <RefinementList attribute="type" /> */}
    </div>
  </div>
)

const PropertySearch = () => {
  const [open, setOpen] = useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const toggleDraw = () => {
    setOpen(!open)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <InstantSearch
      indexName={`${indexPrefix}_PropertySearch`}
      searchClient={searchClient}>
      <div className={"classes.root"}>
        <AppBar position="relative" color="default" style={{ padding: "20px" }}>
          <Toolbar disableGutters={!open}>
            <IconButton
              color="default"
              aria-label="Open drawer"
              onClick={toggleDraw}>
              <SettingsIcon />
            </IconButton>
            <CustomSearchBox fullWidth={true} />
            {/* <Typography variant="h6" color="inherit" noWrap>
              
            </Typography> */}
          </Toolbar>
        </AppBar>
        <Drawer
          // className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}>
          <div
            className={"classes.drawerHeader"}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px",
            }}>
            <h4>Refine your search</h4>
            <IconButton onClick={handleDrawerClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <Divider />
          <Sidebar />
        </Drawer>
        <main>
          <div className={"classes.drawerHeader"} />
          <Content />
        </main>
      </div>
    </InstantSearch>
  )
}

PropertySearch.propTypes = {
  // classes: PropTypes.object.isRequired,
  // theme: PropTypes.object.isRequired,
}

export default PropertySearch
