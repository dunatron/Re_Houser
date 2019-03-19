import React, { Component } from "react"
import ApplicationItem from "./ApplicationItem"

export default class RentalApplications extends Component {
  render() {
    const { applications } = this.props
    return (
      <div>
        {applications &&
          applications.map((application, idx) => {
            return <ApplicationItem application={application} index={idx} />
          })}
      </div>
    )
  }
}
