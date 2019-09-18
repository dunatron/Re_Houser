import React, { Component } from "react"

export default class DetailItem extends Component {
  render() {
    const { icon, label, value, type = "string" } = this.props
    return (
      <div style={{ padding: "8px" }}>
        <div>
          <span style={{ display: "flex" }}>
            {icon && icon}
            {renderValue(value, type)}
          </span>
          <div>{label}</div>
        </div>
      </div>
    )
  }
}

const renderValue = (value, type) => {
  if (type === "boolean") {
    if (value === true || value === "true") {
      return "Yes"
    }
    return "No"
  }
  if (type === "date") {
  }
  return value
}
