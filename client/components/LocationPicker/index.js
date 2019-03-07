import React, { Component } from "react"
import Head from "next/head"
import Geosuggest from "react-geosuggest"
// import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react"
import Map from "../Map/index"

export default class index extends Component {
  state = {
    desc: "",
    lat: 0,
    lng: 0,
    showMap: true,
    images: [],
  }
  /**
   * When the input receives focus
   */
  onFocus(e) {
    // console.log("onFocus")
  }
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
    console.log("suggestion => ", suggestion)
    let lat,
      lng,
      desc = ""
    if (!suggestion) {
      return
    }
    const { location, description, gmaps } = suggestion

    if (description) {
      desc = description
    }

    if (location) {
      lat = location.lat
      lng = location.lng
    }
    // suggestion is returning map info
    if (gmaps) {
      console.log("A PHOTO => ", gmaps.photos)
      if (gmaps.photos) {
        console.log("A PHOTO => ", gmaps.photos[0].getUrl())
      }
    }
    this.props.selection({
      lat: lat,
      lng,
      desc,
    })
    this.setState({
      lat: lat,
      lng,
      desc: desc,
    })
  }
  /**
   * When there are no suggest results
   */
  onSuggestNoResults(userInput) {
    // console.log("onSuggestNoResults for :" + userInput)
  }

  _getZoom = desc => {
    console.log("desc => ", desc)
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

  // ToDo: compose the google props into a global to be able to be used
  render() {
    const fixtures = [
      {
        label: "Dunedin",
        className: "",
        location: { lat: -45.8726082, lng: 170.3870355 },
      },
      {
        label: "Dunedin Fairfield",
        className: "",
        location: { lat: -45.9092488, lng: 170.3752489 },
      },

      { label: "Auckland", location: { lat: -36.8621432, lng: 174.5846042 } },
      { label: "Wellington", location: { lat: -41.2440266, lng: 174.6214293 } },
    ]
    console.log("PROPS => ", this.props)

    return (
      <div>
        <Geosuggest
          fixtures={fixtures}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChange={this.onChange}
          // onSuggestSelect={this.onSuggestSelect}
          onSuggestSelect={suggestion => this._suggest(suggestion)}
          onSuggestNoResults={this.onSuggestNoResults}
          location={new google.maps.LatLng(-40.4338295, 166.3289194)}
          types={["geocode"]}
          radius="20"
          country="nz"
        />
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
