import React, { Component } from "react"
import Head from "next/head"
import Geosuggest from "react-geosuggest"
// import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react"
import Map from "../Map/index"
import SelectOption from "../Inputs/SelectOption"
// Advanced Expansion
import ExpansionPanel from "@material-ui/core/ExpansionPanel"
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails"
import Typography from "@material-ui/core/Typography"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import { CountryCodesArray } from "../../lib/countryCodes"
import { LOCATION_TYPES } from "../../lib/locationTypes"
import { WORLD_FIXTURES } from "../../lib/locationFixtures"

export default class index extends Component {
  state = {
    desc: "",
    lat: -46.1326615,
    lng: 168.89592100000004,
    showMap: true,
    images: [],
    country: "NZ",
    type: "geocode",
  }
  /**
   * When the input receives focus
   */
  onFocus(e) {}
  /**
   * When the input loses focus
   */
  onBlur(e) {
    // console.log("onBlur", e)
  }
  /**
   * When the input got changed
   */
  onChange(v) {
    // console.log("input changes to :" + v)
  }
  /**
   * When a suggest got selected
   */
  _suggest = suggestion => {
    let lat,
      lng,
      desc = ""
    let images = []
    if (!suggestion) {
      return
    }
    const { location, description, gmaps } = suggestion

    console.log("The suggestion => ", suggestion)

    if (description) {
      desc = description
    }

    if (location) {
      lat = location.lat
      lng = location.lng
    }
    // suggestion is returning map info
    if (gmaps) {
      if (gmaps.photos) {
        images = gmaps.photos.map(photo => photo.getUrl())
      }
    }
    this.props.selection({
      lat: lat,
      lng,
      desc,
      images: images,
    })

    this.setState({
      lat: lat,
      lng,
      desc: desc,
      images: images,
    })
    this.shouldStayOpen()
  }
  shouldStayOpen = () => {
    // this._geoSuggest.focus()
  }
  /**
   * When there are no suggest results
   */
  onSuggestNoResults(userInput) {
    // console.log("onSuggestNoResults for :" + userInput)
  }

  _getZoom = desc => {
    if (desc.length <= 3) {
      return 10
    }
    if (desc.length <= 5) {
      return 11
    }
    if (desc.length <= 8) {
      return 13
    }
    if (desc.length <= 12) {
      return 14
    }
    if (desc.length <= 17) {
      return 15
    }
    if (desc.length <= 23) {
      return 16
    }
    return 18
  }

  _getFixtures = () => {
    if (this.state.country) {
      return WORLD_FIXTURES.filter(
        fixture => fixture.countyCode === this.state.country
      )
    }
    return false
  }

  // ToDo: compose the google props into a global to be able to be used
  // ToDo: make sure a selection ends in refocusing the input field
  render() {
    return (
      <div>
        <Geosuggest
          ref={el => (this._geoSuggest = el)}
          fixtures={this._getFixtures()}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChange={this.onChange}
          onSuggestSelect={suggestion => this._suggest(suggestion)}
          onSuggestNoResults={this.onSuggestNoResults}
          location={new google.maps.LatLng(-46.1326615, 168.89592100000004)}
          types={this.state.type === "ALL" ? null : this.state.types}
          radius="20"
          country={this.state.country === "ALL" ? null : this.state.country}
        />
        <div>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Location advanced Options</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails
              style={{ display: "flex", flexWrap: "wrap" }}>
              <SelectOption
                label="Country"
                value={this.state.country}
                options={[{ name: "ALL", value: "ALL" }].concat(
                  CountryCodesArray
                )}
                handleChange={e => this.setState({ country: e.target.value })}
              />

              <SelectOption
                label="Type"
                value={this.state.type}
                options={[{ name: "ALL", value: "ALL" }].concat(LOCATION_TYPES)}
                handleChange={e => this.setState({ type: e.target.value })}
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
        {this.state.showMap && (
          <Map
            center={{
              lat: this.state.lat,
              lng: this.state.lng,
            }}
            zoom={this._getZoom(this.state.desc)}
          />
        )}
      </div>
    )
  }
}
