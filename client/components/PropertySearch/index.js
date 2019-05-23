import React, { useState } from "react"
import styled from "styled-components"
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
import CustomSearchBox from "./CustomSearchBox"
import SettingsIcon from "../../styles/icons/SettingsIcon"
import CloseIcon from "../../styles/icons/CloseIcon"

import { SearchInterface } from "./styles"

import ConnectedCheckBoxRefinementList from "./refinements/CheckBoxList"
import ConnectedMaterialUiSortBy from "./refinements/SortBy"
import ConnectedMaterialPagination from "./refinements/Pagination"
import CustomHighlight from "./refinements/CustomHiglight"
import PropertyCard from "../PropertyCard/index"

import {
  InstantSearch,
  Hits,
  connectHighlight,
  Pagination,
  Stats,
  SortBy,
} from "react-instantsearch-dom"

var applicationId = "4QW4S8SE3J"
var apiKey = "506b6dcf7516c20a1789e6eb9d9a5b39"
const searchClient = algoliasearch(applicationId, apiKey)
const indexPrefix = process.env.NODE_ENV === "development" ? "dev" : "prod"

const Hit = ({ hit }) => (
  <div className="si-hit">
    <div className="si-hit__location">
      <CustomHighlight attribute={"location"} hit={hit} />
    </div>
    <PropertyCard property={hit} isSearch={true} />
  </div>
)

const Content = () => (
  <div className="si-content">
    <div className="si-info">
      <Stats />
      <ConnectedMaterialUiSortBy
        items={[
          { value: `${indexPrefix}_PropertySearch`, label: "Relevance" },
          {
            value: `${indexPrefix}_PropertySearch_price_asc`,
            label: "Lowest Price",
          },
          {
            value: `${indexPrefix}_PropertySearch_price_desc`,
            label: "Highest Price",
          },
        ]}
        defaultRefinement={`${indexPrefix}_PropertySearch`}
      />
    </div>

    <Hits hitComponent={Hit} />
    <div className="pagination">
      <ConnectedMaterialPagination />
      <Pagination showLast={true} />
    </div>
  </div>
)

const Sidebar = () => (
  <div className="si-drawer__sidebar">
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
    </div>
  </div>
)

const DrawHeader = ({ close }) => (
  <div className="si-drawer__header" style={{}}>
    <h4>Refine your search</h4>
    <IconButton onClick={close} className="si-drawer__close-btn">
      <CloseIcon />
    </IconButton>
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
      <SearchInterface>
        <AppBar
          position="relative"
          color="default"
          style={{ padding: "8px", zIndex: 0 }}>
          <Toolbar disableGutters={!open}>
            <IconButton
              color="default"
              style={{ margin: "0 12px 0 0" }}
              aria-label="Open drawer"
              onClick={toggleDraw}>
              <SettingsIcon />
            </IconButton>
            <CustomSearchBox fullWidth={true} />
          </Toolbar>
        </AppBar>
        <Drawer
          className="si-drawer"
          variant="persistent"
          anchor="left"
          open={open}>
          <DrawHeader close={handleDrawerClose} />
          <Divider />
          <Sidebar />
        </Drawer>
        <Content />
      </SearchInterface>
    </InstantSearch>
  )
}

PropertySearch.propTypes = {
  // classes: PropTypes.object.isRequired,
  // theme: PropTypes.object.isRequired,
}

export default PropertySearch
