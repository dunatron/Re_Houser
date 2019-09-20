import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Mutation } from "react-apollo";
import Error from "../ErrorMessage/index";
// Steps
import UserDetailsStep from "./steps/UserDetailsStep";
import ApplicationDetailsStep from "./steps/ApplicationDetailsStep";
import FinaliseApplicationStep from "./steps/FinaliseApplicationStep";
// configs
import { USER_PROFILE_CONF } from "../../lib/configs/userProfileConfig";
import { RENTAL_GROUP_APPLICANT_CONF } from "../../lib/configs/rentalGroupApplicantConfig";
import customErrorsBag from "../../lib/errorsBagGenerator";
import { UPDATE_RENTAL_GROUP_APPLICANT_MUTATION } from "../../mutation/index";
import { gql, graphql } from "react-apollo";

import { SINGLE_RENTAL_APPLICATION_QUERY } from "../../query/index";

import { isEmpty } from "ramda";

const styles = theme => ({
  root: {
    width: "90%"
  },
  button: {
    marginRight: theme.spacing.unit
  },
  completed: {
    display: "inline-block"
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
});

const getSteps = () => {
  return ["My Details", "Application Details", "Finalise"];
};

const extractApplicantUserData = (application, me) => {
  const userRentalApplicantData = application.applicants.find(
    applicant => applicant.user.id === me.id
  );
  return userRentalApplicantData;
};

const extractUserInfoFields = (application, me) => {
  const applicantUserData = extractApplicantUserData(application, me);
  console.group("extractUserInfo");
  console.log("application => ", application);
  console.log("me => ", me);
  console.log("applicantUserData => ", applicantUserData);
  console.groupEnd();
  const userInfoObj = RENTAL_GROUP_APPLICANT_CONF.reduce((bigObj, conf) => {
    // const objPiece = { [conf.variableName]: [me[conf.variableName]] };
    const objPiece = {
      [conf.variableName]: {
        ...conf,
        label: conf.label,
        value: applicantUserData[conf.variableName]
          ? applicantUserData[conf.variableName]
          : me[conf.variableName],
        editable: conf.editable
      }
    };
    bigObj = { ...bigObj, ...objPiece };
    return bigObj;
  }, {});
  return userInfoObj;
};

const RentalApplicationStepper = props => {
  // 1. extract props
  const { classes, me, property, application } = props;
  // 2. get application query
  const rentalApplication = useQuery(SINGLE_RENTAL_APPLICATION_QUERY, {
    variables: {
      where: { id: application.id }
    }
  });

  const { data, loading, error } = rentalApplication;
  // Note: all hooks must go before first render

  console.log("rentalApplication useQuery => ", rentalApplication);
  const [activeStep, setActiveStep] = useState(0);
  // {0: true, 1: true}
  const [completed, setCompleted] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [applicationInfo, setApplicationInfo] = useState(
    data.rentalApplication
  );
  const [userErrorsBag, setUserErrorsBag] = useState({});
  // 5. create some state for the stepper
  // 6. subscribe to data.rentalApplication and update state when we have it
  useEffect(() => {
    if (data.rentalApplication) {
      setApplicationInfo(data.rentalApplication);
      const applicantInfo = extractApplicantUserData(
        data.rentalApplication,
        me
      );
      const userInfoFields = extractUserInfoFields(data.rentalApplication, me);
      setUserInfo(userInfoFields);
      console.log("userInfoObj useEffect => ", userInfoFields);
      // if user as completed step hide it
      if (applicantInfo.completed) {
        setCompleted({ ...completed, 0: true });
        setActiveStep(1);
      }
    }
  }, [data.rentalApplication]);

  if (loading) return "fetching application data";
  if (error) return "error";

  const handleDetailsChange = e => {
    // console.log("handleDetailsChange => ", e)
    const name = e.target.name;
    const varName = `userInfo.${[e.target.name]}`;
    setUserInfo({
      ...userInfo,
      [e.target.name]: {
        ...userInfo[e.target.name],
        value: e.target.value
      }
    });
  };
  const getStepContent = (step, me, property, application) => {
    switch (step) {
      case 0:
        return (
          <UserDetailsStep
            me={me}
            property={property}
            userInfo={userInfo}
            onChange={handleDetailsChange}
            errorsBag={userErrorsBag}
            completed={completed[0]}
          />
        );
      case 1:
        return (
          <ApplicationDetailsStep
            // application={application}
            application={application}
            property={property}
            me={me}
            applicationInfo={applicationInfo}
          />
        );
      case 2:
        return <FinaliseApplicationStep application={application} />;
      default:
        return "Unknown step";
    }
  };

  const totalSteps = () => getSteps().length;

  const handleNext = () => {
    let currStep = activeStep;
    if (isLastStep() && !allStepsCompleted()) {
      // It's the last step, but not all steps have been completed,
      // find the first step that has been completed
      const steps = getSteps();
      currStep = steps.findIndex((step, i) => !(i in completed));
    } else {
      currStep = currStep + 1;
    }
    setActiveStep(currStep);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleStep = step => () => {
    setActiveStep(step);
  };

  // Check Complete for each step
  const handleComplete = async () => {
    switch (activeStep) {
      case 0: {
        const didSave = await _saveUserDetails(userInfo);
        if (!didSave) {
          return;
        }
        break;
      }
      case 1: {
        const didSave = await _saveApplicationDetails(applicationInfo);
        if (!didSave) {
          return;
        }
        break;
      }
    }
    // 0 === userDetails
    // 1 === applicationDetails
    // 2 === addFriends/complete?
    completed[activeStep] = true;
    setCompleted(completed);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const steps = getSteps();

  const _renderNextButtons = () => {
    switch (activeStep) {
      case 0: {
        return (
          <Button variant="contained" color="primary" onClick={handleComplete}>
            Complete User Details
          </Button>
        );
      }
      case 1: {
        return (
          <Button variant="contained" color="primary" onClick={handleComplete}>
            Complete Application Details
          </Button>
        );
      }
      default: {
        return (
          <Button variant="contained" color="primary" onClick={handleComplete}>
            Finish
          </Button>
        );
      }
    }
  };

  // Validation on step Save
  const _saveUserDetails = async userInfo => {
    const { classes, me, property, application } = props;
    if (!me.photoIdentification) {
      alert("You need photo ID");
      return;
    }
    await setUserErrorsBag({});
    const errorsBag = customErrorsBag(userInfo);
    if (!isEmpty(errorsBag)) {
      setUserErrorsBag(errorsBag);
      return false;
    }

    // update the application with a mutation
    const userData = Object.keys(userInfo).reduce((previous, key) => {
      previous[key] = userInfo[key].value;
      return previous;
    }, {});
    // console.log("userData => ", userData)
    const userRentalApplicantData = props.application.applicants.find(
      applicant => applicant.user.id === props.me.id
    );
    const rentalGroupApplicantData = {
      completed: true,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName
    };
    // console.log("rentalGroupApplicantData => ", rentalGroupApplicantData)
    const updatedUser = props.updateRentalGroupApplicant({
      variables: {
        data: rentalGroupApplicantData,
        where: {
          id: userRentalApplicantData.id
        }
      }
    });
    return true;
  };

  const _saveApplicationDetails = async application => {
    const me = props.me;
    // console.log("application _saveApplicationDetails", application)
    // Only owner can update this section
    if (application.owner.id !== me.id) {
      toast.error(
        <div>
          <h3>Only the owner can Update this section</h3>
          <h3>${application.owner.firstName}</h3>
          <h3>${application.owner.email}</h3>
        </div>
      );
      return false;
    }
    // Now we need to save the application details and at the same time handle the cache update
    return true;
  };

  return (
    <div className={classes.root}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton
              onClick={handleStep(index)}
              completed={completed[index]}
            >
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
              {getStepContent(activeStep, me, property, data.rentalApplication)}
            </Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
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
                        setCompleted({ ...completed, [activeStep]: false });
                      }}
                    >
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
  );
};

RentalApplicationStepper.propTypes = {
  classes: PropTypes.object,
  me: PropTypes.object,
  property: PropTypes.object
};

// export default withStyles(styles)(RentalApplicationStepper)
export default compose(
  withStyles(styles),
  graphql(UPDATE_RENTAL_GROUP_APPLICANT_MUTATION, {
    name: "updateRentalGroupApplicant"
  })
)(RentalApplicationStepper);
