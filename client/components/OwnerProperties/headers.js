import React, { PureComponent } from "react"

export default class PropertyStripHeaders extends PureComponent {
  render() {
    return (
      <div className="headers">
        <div className="item id">id</div>
        <div className="item location">location</div>
        <div className="item location">rooms</div>
        <div className="item location">rent</div>
        <div className="item location">moveInDate</div>
        <div className="item location">onTheMarket</div>
        <div className="item location">locationLat</div>
        <div className="item location">locationLng</div>
      </div>
    )
  }
}
