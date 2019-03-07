import React, { Component } from "react"
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react"

export class MapContainer extends Component {
  render() {
    const { center } = this.props
    return (
      <div style={{ position: "relative", height: 300 }}>
        <Map
          google={this.props.google}
          zoom={18}
          center={{
            lat: 40.854885,
            lng: -88.081807,
          }}
          {...this.props}>
          <Marker onClick={this.onMarkerClick} name={"Current location"} />
          <Marker
            title={"The marker`s title will appear as a tooltip."}
            name={"SOMA"}
            position={{
              lat: center ? center.lat: 0,
              lng: center ? center.lng: 0,
            }}
          />

          <InfoWindow onClose={this.onInfoWindowClose}>
            <div>{/* <h1>{this.state.selectedPlace.name}</h1> */}</div>
          </InfoWindow>
        </Map>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDe_TIz2AQ9mKfYpsb6U3RG7fjnM8eYvk0",
})(MapContainer)
