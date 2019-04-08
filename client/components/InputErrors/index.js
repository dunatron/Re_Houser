import React, { Component } from "react"

export default class InputErrors extends Component {
  render() {
    // const { errors } = this.props
    // if (!errors) return null
    if (!this.props.errors) {
      return null
    }

    return (
      <div>
        {this.props.errors.map((err, i) => (
          <div>
            <h1 style={{ color: "red" }}>{err}</h1>
          </div>
        ))}
      </div>
    )
  }
}
