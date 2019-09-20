import React, { useState, useEffect } from "react"
import { useQuery, useMutation } from "@apollo/react-hooks"
import { toast } from "react-toastify"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import Stepper from "@material-ui/core/Stepper"
import Step from "@material-ui/core/Step"
import StepButton from "@material-ui/core/StepButton"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Error from "../ErrorMessage/index"
import Loader from "../Loader/index"
// Steps
import UserDetailsStep from "./steps/UserDetailsStep"
import ApplicationDetailsStep from "./steps/ApplicationDetailsStep"
import FinaliseApplicationStep from "./steps/FinaliseApplicationStep"
// configs
import { RENTAL_GROUP_APPLICANT_CONF } from "../../lib/configs/rentalGroupApplicantConfig"
import customErrorsBag from "../../lib/errorsBagGenerator"
import { UPDATE_RENTAL_GROUP_APPLICANT_MUTATION } from "../../mutation/index"

import { SINGLE_RENTAL_APPLICATION_QUERY } from "../../query/index"

import { isEmpty } from "ramda"

const useStyles = makeStyles(theme => ({
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
}))

const getSteps = () => {
  return ["My Details", "Application Details", "Finalise"]
}

const extractApplicantUserData = (application, me) => {
  const userRentalApplicantData = application.applicants.find(
    applicant => applicant.user.id === me.id
  )
  return userRentalApplicantData
}

const extractUserInfoFields = (application, me) => {
  const applicantUserData = extractApplicantUserData(application, me)
  const userInfoObj = RENTAL_GROUP_APPLICANT_CONF.reduce((bigObj, conf) => {
    const objPiece = {
      [conf.variableName]: {
        ...conf,
        label: conf.label,
        value: applicantUserData[conf.variableName]
          ? applicantUserData[conf.variableName]
          : me[conf.variableName],
        editable: conf.editable,
      },
    }
    bigObj = { ...bigObj, ...objPiece }
    return bigObj
  }, {})
  return userInfoObj
}

// const RentalApplicationStepper = ({ me, property, application }) => {
const RentalApplicationStepper = props => {
  const { me, property, application } = props
  const classes = useStyles()
  // 2. update rental group applicant mutation
  const [updateRentalGroupApplicant] = useMutation(
    UPDATE_RENTAL_GROUP_APPLICANT_MUTATION
  )

  // Note: all hooks must go before first render
  const [activeStep, setActiveStep] = useState(0)
  const [completed, setCompleted] = useState({})
  const [userInfo, setUserInfo] = useState({})
  const [applicationInfo, setApplicationInfo] = useState({})
  const [userErrorsBag, setUserErrorsBag] = useState({})

  useEffect(() => {
    if (application) {
      setApplicationInfo(application)
      const applicantInfo = extractApplicantUserData(application, me)
      const userInfoFields = extractUserInfoFields(application, me)
      setUserInfo(userInfoFields)
      // if user as completed step hide it
      if (applicantInfo.completed) {
        setCompleted({ ...completed, 0: true })
        setActiveStep(1)
      }
    }
  }, [application])

  const handleDetailsChange = e => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: {
        ...userInfo[e.target.name],
        value: e.target.value,
      },
    })
  }
  const getStepContent = (step, me, property, application) => {
    switch (step) {
      case 0:
        return (
          <UserDetailsStep
            me={me}
            property={property}
            application={application}
            userInfo={userInfo}
            onChange={handleDetailsChange}
            errorsBag={userErrorsBag}
            completed={completed[0]}
          />
        )
      case 1:
        return (
          <ApplicationDetailsStep
            application={application}
            property={property}
            me={me}
            applicationInfo={applicationInfo}
          />
        )
      case 2:
        return <FinaliseApplicationStep application={application} />
      default:
        return "Unknown step"
    }
  }

  const totalSteps = () => getSteps().length

  const handleNext = () => {
    let currStep = activeStep
    if (isLastStep() && !allStepsCompleted()) {
      const steps = getSteps()
      currStep = steps.findIndex((step, i) => !(i in completed))
    } else {
      currStep = currStep + 1
    }
    setActiveStep(currStep)
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  const handleStep = step => () => {
    setActiveStep(step)
  }

  // Check Complete for each step
  const handleComplete = async () => {
    switch (activeStep) {
      case 0: {
        const didSave = await _saveUserDetails(userInfo)
        if (!didSave) {
          return
        }
        break
      }
      case 1: {
        const didSave = await _saveApplicationDetails(applicationInfo)
        if (!didSave) {
          return
        }
        break
      }
    }
    completed[activeStep] = true
    setCompleted(completed)
    handleNext()
  }

  const handleReset = () => {
    setActiveStep(0)
    setCompleted({})
  }

  const completedSteps = () => {
    return Object.keys(completed).length
  }

  const isLastStep = () => {
    return activeStep === totalSteps() - 1
  }

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps()
  }

  const steps = getSteps()

  const _renderNextButtons = () => {
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
  const _saveUserDetails = async () => {
    if (!me.photoIdentification) {
      alert("You need photo ID")
      return
    }
    await setUserErrorsBag({})
    const errorsBag = customErrorsBag(userInfo)
    if (!isEmpty(errorsBag)) {
      setUserErrorsBag(errorsBag)
      return false
    }

    // update the application with a mutation
    const userData = Object.keys(userInfo).reduce((previous, key) => {
      previous[key] = userInfo[key].value
      return previous
    }, {})
    // console.log("userData => ", userData)
    const userRentalApplicantData = application.applicants.find(
      applicant => applicant.user.id === me.id
    )
    const rentalGroupApplicantData = {
      completed: true,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
    }
    // console.log("rentalGroupApplicantData => ", rentalGroupApplicantData)
    updateRentalGroupApplicant({
      variables: {
        data: rentalGroupApplicantData,
        where: {
          id: userRentalApplicantData.id,
        },
      },
    })
    return true
  }

  const _saveApplicationDetails = async () => {
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
              completed={completed[index]}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <div>
            <Typography className={classes.instructions} component="div">
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset}>Close</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions} component="div">
              {/* {getStepContent(activeStep, me, property, application)} */}
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
                (completed[activeStep] ? (
                  <div>
                    <Typography variant="caption" className={classes.completed}>
                      Step {activeStep + 1} already completed
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        setCompleted({ ...completed, [activeStep]: false })
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

const ConnectedRentalApplicationStepper = props => {
  const { me, property, application } = props
  const rentalApplication = useQuery(SINGLE_RENTAL_APPLICATION_QUERY, {
    variables: {
      where: { id: application.id },
    },
  })
  const { data, loading, error } = rentalApplication

  if (loading) return <Loader loading={loading} />
  if (error) return <Error error={error} text="Loading Application" />
  return <RentalApplicationStepper {...props} />
}

RentalApplicationStepper.propTypes = {
  me: PropTypes.object,
  property: PropTypes.object,
}

export default RentalApplicationStepper
