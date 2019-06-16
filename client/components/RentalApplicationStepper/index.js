import React, { useState, useEffect } from "react"
import { toast } from "react-toastify"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Stepper from "@material-ui/core/Stepper"
import Step from "@material-ui/core/Step"
import StepButton from "@material-ui/core/StepButton"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import { Mutation } from "react-apollo"
import Error from "../ErrorMessage/index"
// Steps
import UserDetailsStep from "./steps/UserDetailsStep"
import ApplicationDetailsStep from "./steps/ApplicationDetailsStep"
import FinaliseApplicationStep from "./steps/FinaliseApplicationStep"
// configs
import { USER_PROFILE_CONF } from "../../lib/configs/userProfileConfig"
import { RENTAL_GROUP_APPLICANT_CONF } from "../../lib/configs/rentalGroupApplicantConfig"
import customErrorsBag from "../../lib/errorsBagGenerator"
import { UPDATE_RENTAL_GROUP_APPLICANT_MUTATION } from "../../mutation/index"
import { gql, graphql, compose } from "react-apollo"

import { isEmpty } from "ramda"

const styles = theme => ({
  root: {
    width: "90%",
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  completed: {
    display: "inline-block",
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
})

const getSteps = () => {
  return ["My Details", "Application Details", "Finalise"]
}

const RentalApplicationStepper = props => {
  // state = {
  //   activeStep: 0,
  //   completed: {},
  //   userInfo: {},
  //   applicationInfo: {},
  //   userErrorsBag: {},
  // }
  const { classes, me, property, application } = props
  const getApplicantObject = () => {
    const userRentalApplicantData = props.application.applicants.find(
      applicant => applicant.user.id === props.me.id
    )
    return userRentalApplicantData
  }
  const applicantData = getApplicantObject()
  const applicationInfo = props.application
  const userInfo = RENTAL_GROUP_APPLICANT_CONF.reduce((bigObj, conf) => {
    // const objPiece = { [conf.variableName]: [me[conf.variableName]] };
    const objPiece = {
      [conf.variableName]: {
        ...conf,
        label: conf.label,
        value: applicantData[conf.variableName]
          ? applicantData[conf.variableName]
          : me[conf.variableName],
        editable: true,
      },
    }
    bigObj = { ...bigObj, ...objPiece }
    return bigObj
  }, {})

  const [state, setState] = useState({
    activeStep: 0,
    completed: {},
    userInfo: userInfo,
    applicationInfo: applicationInfo,
    userErrorsBag: {},
  })
  useEffect(() => {}, [])
  const getStepContent = (step, me, property, application) => {
    const { userErrorsBag } = state
    const applicantData = getApplicantObject()
    // console.log("applicantData => for step component => ", applicantData)
    switch (step) {
      case 0:
        // return "Step 2: What is an ad group anyways?";
        return (
          <UserDetailsStep
            me={me}
            property={property}
            userInfo={state.userInfo}
            applicantData={applicantData}
            onChange={handleDetailsChange}
            errorsBag={userErrorsBag}
            completed={state.completed[0]}
          />
        )
      case 1:
        return (
          <ApplicationDetailsStep
            application={application}
            property={property}
            me={me}
            applicationInfo={state.applicationInfo}
          />
        )
      case 2:
        return <FinaliseApplicationStep application={application} />
      default:
        return "Unknown step"
    }
  }

  const handleDetailsChange = e => {
    // console.log("handleDetailsChange => ", e)
    const name = e.target.name
    const varName = `userInfo.${[e.target.name]}`
    setState({
      ...state,
      userInfo: {
        ...state.userInfo,
        [e.target.name]: {
          ...state.userInfo[e.target.name],
          value: e.target.value,
        },
      },
    })
  }

  const totalSteps = () => getSteps().length

  const handleNext = () => {
    let activeStep

    if (isLastStep() && !allStepsCompleted()) {
      // It's the last step, but not all steps have been completed,
      // find the first step that has been completed
      const steps = getSteps()
      activeStep = steps.findIndex((step, i) => !(i in state.completed))
    } else {
      activeStep = state.activeStep + 1
    }
    setState({
      ...state,
      activeStep,
    })
  }

  const handleBack = () => {
    setState(state => ({
      ...state,
      activeStep: state.activeStep - 1,
    }))
  }

  const handleStep = step => () => {
    setState({
      ...state,
      activeStep: step,
    })
  }

  // Check Complete for each step
  const handleComplete = async () => {
    const { completed } = state
    switch (state.activeStep) {
      case 0: {
        const didSave = await _saveUserDetails(state.userInfo)
        if (!didSave) {
          return
        }
        break
      }
      case 1: {
        const didSave = await _saveApplicationDetails(state.applicationInfo)
        if (!didSave) {
          return
        }
        break
      }
    }
    // 0 === userDetails
    // 1 === applicationDetails
    // 2 === addFriends/complete?
    completed[state.activeStep] = true

    setState({
      ...state,
      completed,
    })
    handleNext()
  }

  const handleReset = () => {
    setState({
      ...state,
      activeStep: 0,
      completed: {},
    })
  }

  const completedSteps = () => {
    return Object.keys(state.completed).length
  }

  const isLastStep = () => {
    return state.activeStep === totalSteps() - 1
  }

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps()
  }

  const steps = getSteps()
  const { activeStep } = state

  const _renderNextButtons = () => {
    const { activeStep } = state
    switch (activeStep) {
      case 0: {
        return (
          <Button variant="contained" color="primary" onClick={handleComplete}>
            Complete User Details
          </Button>
        )
      }
      case 1: {
        return (
          <Button variant="contained" color="primary" onClick={handleComplete}>
            Complete Application Details
          </Button>
        )
      }
      default: {
        return (
          <Button variant="contained" color="primary" onClick={handleComplete}>
            Finish
          </Button>
        )
      }
    }
  }

  // Validation on step Save
  const _saveUserDetails = async userInfo => {
    // console.log("userInfo => ", userInfo)
    const { classes, me, property, application } = props
    if (!me.photoIdentification) {
      alert("You need photo ID")
      return
    }
    await setState({ ...state, userErrorsBag: {} })
    const errorsBag = customErrorsBag(userInfo)
    // console.log("errorsBag => ", errorsBag)
    // if there are errors exit early and set userErrorsBag
    if (!isEmpty(errorsBag)) {
      setState({ ...state, userErrorsBag: errorsBag })
      return false
    }

    // update the application with a mutation
    const userData = Object.keys(userInfo).reduce((previous, key) => {
      previous[key] = userInfo[key].value
      return previous
    }, {})
    // console.log("userData => ", userData)
    const userRentalApplicantData = props.application.applicants.find(
      applicant => applicant.user.id === props.me.id
    )
    const rentalGroupApplicantData = {
      completed: true,
      email: userData.email,
      firstName: userData.firstName,
    }
    // console.log("rentalGroupApplicantData => ", rentalGroupApplicantData)
    const updatedUser = props.updateRentalGroupApplicant({
      variables: {
        data: rentalGroupApplicantData,
        where: {
          id: userRentalApplicantData.id,
        },
      },
    })
    return true
  }

  const _saveApplicationDetails = async application => {
    const me = props.me
    // console.log("application _saveApplicationDetails", application)
    // Only owner can update this section
    if (application.owner.id !== me.id) {
      toast.error(
        <div>
          <h3>Only the owner can Update this section</h3>
          <h3>${application.owner.firstName}</h3>
          <h3>${application.owner.email}</h3>
        </div>
      )
      return false
    }
    // Now we need to save the application details and at the same time handle the cache update
    return true
  }

  return (
    <div className={classes.root}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton
              onClick={handleStep(index)}
              completed={state.completed[index]}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset}>Close</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep, me, property, application)}
            </Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}>
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}>
                Next
              </Button>
              {activeStep !== steps.length &&
                (state.completed[state.activeStep] ? (
                  <div>
                    <Typography variant="caption" className={classes.completed}>
                      Step {activeStep + 1} already completed
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        const { completed } = state
                        completed[state.activeStep] = false
                        setState({ completed })
                      }}>
                      Redo Section
                    </Button>
                  </div>
                ) : (
                  <div>{_renderNextButtons()}</div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

RentalApplicationStepper.propTypes = {
  classes: PropTypes.object,
  me: PropTypes.object,
  property: PropTypes.object,
}

// export default withStyles(styles)(RentalApplicationStepper)
export default compose(
  withStyles(styles),
  graphql(UPDATE_RENTAL_GROUP_APPLICANT_MUTATION, {
    name: "updateRentalGroupApplicant",
  })
)(RentalApplicationStepper)
