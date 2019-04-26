import React, { Component } from "react"

export default class DetailItem extends Component {
  render() {
    const { icon, label, value } = this.props
    return (
      <div style={{ padding: "8px" }}>
        <div>
          <span style={{ display: "flex" }}>
            {icon && icon}
            {value}
          </span>
          <div>{label}</div>
        </div>
      </div>
    )
  }
}
