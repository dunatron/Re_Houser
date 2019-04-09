import React, { Component } from "react"
import PropTypes from "prop-types"

import { USER_PROFILE_CONF } from "../../../lib/configs/userProfileConfig"
import TextInput from "../../../styles/TextInput"
import InputErrors from "../../InputErrors/index"

class UserDetailsStep extends Component {
  state = {
    activeStep: 0,
    completed: {},
  }

  render() {
    const {
      me,
      property,
      onChange,
      errorsBag,
      applicantData,
      completed,
    } = this.props

    const { userInfo } = this.state

    console.log("applicantData => ", applicantData)

    if (completed) {
      return <div>Applicant data for the group application is complete</div>
    }

    return (
      <div>
        {Object.keys(this.props.userInfo).map((userVar, i) => {
          console.log("userVar => ", userVar)

          return (
            <div>
              <TextInput
                fullWidth={true}
                name={userVar}
                disabled={false}
                label={this.props.userInfo[userVar].label}
                value={this.props.userInfo[userVar].value}
                onChange={e => onChange(e)}
                // onChange={e => console.log("First step => ", e)}
              />
              {errorsBag[userVar] && (
                <InputErrors
                  errors={errorsBag[userVar] ? errorsBag[userVar].errors : null}
                />
              )}
            </div>
          )
        })}
      </div>
    )
  }
}

UserDetailsStep.propTypes = {
  me: PropTypes.object,
  property: PropTypes.object,
}

export default UserDetailsStep
