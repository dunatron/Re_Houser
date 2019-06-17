import React, { Component, useState } from "react"
import PropTypes from "prop-types"

import { USER_PROFILE_CONF } from "../../../lib/configs/userProfileConfig"
import TextInput from "../../../styles/TextInput"
import InputErrors from "../../InputErrors/index"
import PhotoIdUploader from "../../PhotoIdUploader/index"
import { isEmptyObj } from "../../../lib/isEmpty"
import Button from "@material-ui/core/Button"

import { isEmpty } from "ramda"

/**
 * Remember the effects and the effects of when the component should update. i.e on new props recieved
 * aswel as state change... state change should rerender,
 * errorsBag props will need to be caught for 1
 */
const UserDetailsStep = ({
  me,
  userInfo,
  property,
  onChange,
  errorsBag,
  applicantData,
  completed,
}) => {
  // const [activeStep, setActiveStep] = useState([]) // Um what was this meant to be
  // just goes to show we need to refactor everything to useState, useEffect, useQuery etc, useMutation 90%
  // just a thought, since a user can only update 1 rentalAPplication at a time, why not store it in local state
  // then use hooks to update the local apollo state
  // probably easy to get updates
  // const hasPhotoId = !isEmpty(me.photoIdentification)
  const hasPhotoId = me.identificationNumber
  const [showUploader, setShowUploader] = useState(!hasPhotoId)
  console.log()
  return (
    <div>
      {Object.keys(userInfo).map((userVar, i) => {
        const isFieldEditable = userInfo[userVar].editable
        console.log("isFieldEditable => ", isFieldEditable)
        return (
          <div key={i}>
            <TextInput
              fullWidth={true}
              name={userVar}
              disabled={!userInfo[userVar].editable}
              label={userInfo[userVar].label}
              value={userInfo[userVar].value}
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
      {!me.photoIdentification && <h1>YOU NEED PHOTO IDENTIFICATION</h1>}
      {me.photoIdentification && (
        <div>
          <h4>WE have your photo Id</h4>
          <Button
            onClick={() => setShowUploader(!showUploader)}
            variant="outlined">
            {showUploader ? "close photo id" : "SHow Photo id"}
          </Button>
        </div>
      )}
      {showUploader && <PhotoIdUploader me={me} />}
      {/* <PhotoIdUploader me={me} /> */}
    </div>
  )
}

export default UserDetailsStep

/*
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

    console.log("me => ", me)

    // console.log("applicantData => ", applicantData)

    if (completed) {
      return <div>Applicant data for the group application is complete</div>
    }

    return (
      <div>
        {Object.keys(this.props.userInfo).map((userVar, i) => {
          // console.log("userVar => ", userVar)

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

        {!me.photoIdentification && <h1>YOU NEED PHOTO IDENTIFICATION</h1>}
        {me.photoIdentification && (
          <div>
            <h1>WE have your photo Id</h1>
            <button>Click here to see the details</button>
          </div>
        )}
        <PhotoIdUploader me={me} />
      </div>
    )
  }
}

UserDetailsStep.propTypes = {
  me: PropTypes.object,
  property: PropTypes.object,
}

export default UserDetailsStep

*/
