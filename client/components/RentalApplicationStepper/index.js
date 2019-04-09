import React, { Component } from "react"
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
// configs
import { USER_PROFILE_CONF } from "../../lib/configs/userProfileConfig"
import { RENTAL_GROUP_APPLICANT_CONF } from "../../lib/configs/rentalGroupApplicantConfig"
import customErrorsBag from "../../lib/errorsBagGenerator"
import { UPDATE_RENTAL_GROUP_APPLICANT_MUTATION } from "../../mutation/index"
import { gql, graphql, compose } from "react-apollo"
import { openSnackbar } from "../Notifier/index"

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

function getSteps() {
  return ["My Details", "Application Details", "Finalise"]
}

class RentalApplicationStepper extends Component {
  state = {
    activeStep: 0,
    completed: {},
    userInfo: {},
    applicationInfo: {},
    userErrorsBag: {},
  }
  getStepContent = (step, me, property, application) => {
    const { userErrorsBag } = this.state
    const applicantData = this.getApplicantObject()
    console.log("applicantData => for step component => ", applicantData)
    switch (step) {
      case 0:
        // return "Step 2: What is an ad group anyways?";
        return (
          <UserDetailsStep
            me={me}
            property={property}
            userInfo={this.state.userInfo}
            applicantData={applicantData}
            onChange={this.handleDetailsChange}
            errorsBag={userErrorsBag}
            completed={this.state.completed[0]}
          />
        )
      case 1:
        return (
          <ApplicationDetailsStep
            application={application}
            me={me}
            applicationInfo={this.state.applicationInfo}
          />
        )
      case 2:
        return "Step 3: This is the bit I really care about!"
      default:
        return "Unknown step"
    }
  }
  getApplicantObject = () => {
    const userRentalApplicantData = this.props.application.applicants.find(
      applicant => applicant.user.id === this.props.me.id
    )
    return userRentalApplicantData
  }
  handleDetailsChange = e => {
    console.log("handleDetailsChange => ", e)
    const name = e.target.name
    const varName = `userInfo.${[e.target.name]}`
    console.log("varName ?? => ", varName)
    console.log("value name ", name)
    this.setState({
      userInfo: {
        ...this.state.userInfo,
        [e.target.name]: {
          ...this.state.userInfo[e.target.name],
          value: e.target.value,
        },
      },
    })
    // this.setState({ varName: e.target.value });
    // this.setState({ [e.target.name]: e.target.value })
  }
  componentDidMount() {
    const { completed } = this.state
    const me = this.props.me
    const applicantData = this.getApplicantObject()
    console.log("applicantData ", applicantData)
    // extract userInfo and set it in state
    const userInfo = RENTAL_GROUP_APPLICANT_CONF.reduce((bigObj, conf) => {
      // const objPiece = { [conf.variableName]: [me[conf.variableName]] };
      const objPiece = {
        [conf.variableName]: {
          ...conf,
          label: conf.label,
          value: applicantData[conf.variableName]
            ? applicantData[conf.variableName]
            : me[conf.variableName],
          // value: me[conf.variableName],
          editable: true,
        },
      }
      bigObj = { ...bigObj, ...objPiece }
      return bigObj
    }, {})
    // this.props.application
    const applicationInfo = this.props.application
    console.log("applicationInfo hasMounted => ", applicationInfo)
    // completed[0] = applicantData.completed ? true : false
    this.setState({ userInfo: userInfo, applicationInfo: applicationInfo })
  }

  totalSteps = () => getSteps().length

  handleNext = () => {
    let activeStep

    if (this.isLastStep() && !this.allStepsCompleted()) {
      // It's the last step, but not all steps have been completed,
      // find the first step that has been completed
      const steps = getSteps()
      activeStep = steps.findIndex((step, i) => !(i in this.state.completed))
    } else {
      activeStep = this.state.activeStep + 1
    }
    this.setState({
      activeStep,
    })
  }

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }))
  }

  handleStep = step => () => {
    this.setState({
      activeStep: step,
    })
  }

  // Check Complete for each step
  handleComplete = async () => {
    const { completed } = this.state
    switch (this.state.activeStep) {
      case 0: {
        const didSave = await this._saveUserDetails(this.state.userInfo)
        if (!didSave) {
          return
        }
        break
      }
      case 1: {
        const didSave = await this._saveApplicationDetails(
          this.state.applicationInfo
        )
        if (!didSave) {
          return
        }
        break
      }
    }
    // 0 === userDetails
    // 1 === applicationDetails
    // 2 === addFriends/complete?
    completed[this.state.activeStep] = true

    this.setState({
      completed,
    })
    this.handleNext()
  }

  handleReset = () => {
    this.setState({
      activeStep: 0,
      completed: {},
    })
  }

  completedSteps() {
    return Object.keys(this.state.completed).length
  }

  isLastStep() {
    return this.state.activeStep === this.totalSteps() - 1
  }

  allStepsCompleted() {
    return this.completedSteps() === this.totalSteps()
  }

  render() {
    const { classes, me, property, application } = this.props
    const steps = getSteps()
    const { activeStep } = this.state

    console.log("THE APPLICATION => ", application)
    console.log("This.state => ", this.state)

    return (
      <div className={classes.root}>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepButton
                onClick={this.handleStep(index)}
                completed={this.state.completed[index]}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <div>
          {this.allStepsCompleted() ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={this.handleReset}>Reset</Button>
            </div>
          ) : (
            <div>
              <Typography className={classes.instructions}>
                {this.getStepContent(activeStep, me, property, application)}
              </Typography>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  className={classes.button}>
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleNext}
                  className={classes.button}>
                  Next
                </Button>
                {activeStep !== steps.length &&
                  (this.state.completed[this.state.activeStep] ? (
                    <div>
                      <Typography
                        variant="caption"
                        className={classes.completed}>
                        Step {activeStep + 1} already completed
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          const { completed } = this.state
                          completed[this.state.activeStep] = false
                          this.setState({ completed })
                        }}>
                        Redo Section
                      </Button>
                    </div>
                  ) : (
                    <div>{this._renderNextButtons()}</div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  _renderNextButtons = () => {
    const { activeStep } = this.state
    switch (activeStep) {
      case 0: {
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleComplete}>
            Complete User Details
          </Button>
        )
      }
      case 1: {
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleComplete}>
            Complete Application Details
          </Button>
        )
      }
      default: {
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleComplete}>
            Finish
          </Button>
        )
      }
    }
  }

  // Validation on step Save
  _saveUserDetails = async userInfo => {
    console.log("userInfo => ", userInfo)
    await this.setState({ userErrorsBag: {} })
    const errorsBag = customErrorsBag(userInfo)
    console.log("errorsBag => ", errorsBag)
    // if there are errors exit early and set userErrorsBag
    if (!isEmpty(errorsBag)) {
      this.setState({ userErrorsBag: errorsBag })
      return false
    }
    // update the application with a mutation
    const userData = Object.keys(userInfo).reduce((previous, key) => {
      previous[key] = userInfo[key].value
      return previous
    }, {})
    console.log("userData => ", userData)
    const userRentalApplicantData = this.props.application.applicants.find(
      applicant => applicant.user.id === this.props.me.id
    )
    const rentalGroupApplicantData = {
      completed: true,
      email: userData.email,
      firstName: userData.firstName,
    }
    console.log("rentalGroupApplicantData => ", rentalGroupApplicantData)
    const updatedUser = this.props.updateRentalGroupApplicant({
      variables: {
        data: rentalGroupApplicantData,
        // data: {
        //   approved: true,
        // },
        where: {
          id: userRentalApplicantData.id,
        },
      },
    })
    return true
  }

  _saveApplicationDetails = async application => {
    const me = this.props.me
    console.log("application _saveApplicationDetails", application)
    // Only owner can update this section
    if (application.owner.id !== me.id) {
      openSnackbar({
        message: `<h3>Only the owner can Update this section</h3>
        <h3>${application.owner.firstName}</h3>
        <h3>${application.owner.email}</h3>`,
        duration: 6000,
        type: "success",
      })
      return false
    }
    // Now we need to save the application details and at the same time handle the cache update
    return true
  }
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
