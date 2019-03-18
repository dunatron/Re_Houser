import React, { Component } from "react"

export default class PropertyStrip extends Component {
  render() {
    const {
      property: {
        id,
        rooms,
        rent,
        moveInDate,
        onTheMarket,
        location,
        locationLat,
        locationLng,
      },
    } = this.props
    return (
      <div className="strip">
        <div className="item id">{id}</div>
        <div className="item location">{location}</div>
        <div className="item location">{rooms}</div>
        <div className="item location">{rent}</div>
        <div className="item location">{moveInDate}</div>
        <div className="item location">{onTheMarket}</div>
        <div className="item location">{locationLat}</div>
        <div className="item location">{locationLng}</div>
      </div>
    )
  }
}
