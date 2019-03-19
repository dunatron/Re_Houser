import React, { Component } from "react"
import Map from "../Map/index"
import ImageSlider from "../ImageSlider/index"

export default class Details extends Component {
  render() {
    const { property } = this.props
    return (
      <div>
        <h1>${property.rent}</h1>
        <ImageSlider images={property.images} />
        <Map
          center={{
            lat: property.locationLat,
            lng: property.locationLng,
          }}
        />
      </div>
    )
  }
}
