import React, { Component } from "react"
import PropTypes from "prop-types"

class ApplicationDetailsStep extends Component {
  render() {
    const { me, applicationInfo } = this.props
    // console.log("applicationInfo as Props => ", applicationInfo)
    if (me.id !== applicationInfo.owner.id) {
      return (
        <div>
          Only the owner can edit this section. Here is the information
          <h4>visibility: {applicationInfo.visibility}</h4>
          <h4>Stage: {applicationInfo.stage}</h4>
          <h4>finalised: {applicationInfo.finalised ? "YES " : "NO"}</h4>
        </div>
      )
    }
    return (
      <div>
        <h1>I am the application Details step </h1>
        {applicationInfo.applicants.map((applicant, i) => {
          return (
            <div>
              <h2>Applicant ID: {applicant.id}</h2>
              <h2>approved: {applicant.approved ? "YES" : "NO"}</h2>
            </div>
          )
        })}
      </div>
    )
  }
}

ApplicationDetailsStep.propTypes = {
  me: PropTypes.object,
  property: PropTypes.object,
}

export default ApplicationDetailsStep
