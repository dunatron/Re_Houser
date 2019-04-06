import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Mutation } from "react-apollo";
import { CREATE_RENTAL_APPLICATION } from "../../mutation/index";
import Error from "../ErrorMessage/index";
// Steps
import UserDetailsStep from "./steps/UserDetailsStep";
import ApplicationDetailsStep from "./steps/ApplicationDetailsStep";
// configs
import { USER_PROFILE_CONF } from "../../lib/configs/userProfileConfig";

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

function getSteps() {
  return ["My Details", "Application Details", "Finalise"];
}

class RentalApplicationStepper extends Component {
  state = {
    activeStep: 0,
    completed: {},
    userInfo: {}
  };
  getStepContent = (step, me, property, application) => {
    switch (step) {
      case 0:
        // return "Step 2: What is an ad group anyways?";
        return (
          <UserDetailsStep
            me={me}
            property={property}
            userInfo={this.state.userInfo}
            onChange={this.handleDetailsChange}
          />
        );
      case 1:
        return <ApplicationDetailsStep application={application} />;
      case 2:
        return "Step 3: This is the bit I really care about!";
      default:
        return "Unknown step";
    }
  };
  handleDetailsChange = e => {
    console.log("handleDetailsChange => ", e);
    const name = e.target.name;
    const varName = `userInfo.${[e.target.name]}`;
    console.log("varName ?? => ", varName);
    console.log("value name ", name);
    this.setState({
      userInfo: {
        ...this.state.userInfo,
        [e.target.name]: {
          ...this.state.userInfo[e.target.name],
          value: [e.target.value]
        }
      }
    });
    // this.setState({ varName: e.target.value });
    // this.setState({ [e.target.name]: e.target.value })
  };
  componentDidMount() {
    const me = this.props.me;
    const userInfo = USER_PROFILE_CONF.filter(
      conf => conf.includeInRentalApplication
    ).reduce((bigObj, conf) => {
      // const objPiece = { [conf.variableName]: [me[conf.variableName]] };
      const objPiece = {
        [conf.variableName]: {
          ...conf,
          label: conf.label,
          value: me[conf.variableName],
          editable: true
        }
      };
      bigObj = { ...bigObj, ...objPiece };
      return bigObj;
    }, {});
    this.setState({ userInfo: userInfo });
  }

  totalSteps = () => getSteps().length;

  handleNext = () => {
    let activeStep;

    if (this.isLastStep() && !this.allStepsCompleted()) {
      // It's the last step, but not all steps have been completed,
      // find the first step that has been completed
      const steps = getSteps();
      activeStep = steps.findIndex((step, i) => !(i in this.state.completed));
    } else {
      activeStep = this.state.activeStep + 1;
    }
    this.setState({
      activeStep
    });
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };

  handleStep = step => () => {
    this.setState({
      activeStep: step
    });
  };

  // Check Complete for each step
  handleComplete = () => {
    const { completed } = this.state;
    switch (this.state.activeStep) {
      case 0: {
        this._saveUserDetails(this.state.userInfo);
      }
    }
    // 0 === userDetails
    // 1 === applicationDetails
    // 2 === addFriends/complete?
    completed[this.state.activeStep] = true;

    this.setState({
      completed
    });
    this.handleNext();
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
      completed: {}
    });
  };

  completedSteps() {
    return Object.keys(this.state.completed).length;
  }

  isLastStep() {
    return this.state.activeStep === this.totalSteps() - 1;
  }

  allStepsCompleted() {
    return this.completedSteps() === this.totalSteps();
  }

  render() {
    const { classes, me, property, application } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    console.log("THE APPLICATION => ", application);

    return (
      <div className={classes.root}>
        <Mutation
          mutation={CREATE_RENTAL_APPLICATION}
          // refetchQueries={[
          //   { query: PROPERTIES_QUERY },
          //   { query: OWNER_PROPERTIES_QUERY },
          // ]}
          // variables={this._variables()}
          update={this.update}
        >
          {(createRentalApplication, { error }) => (
            <>
              <Error error={error} />
              <Stepper nonLinear activeStep={activeStep}>
                {steps.map((label, index) => (
                  <Step key={label}>
                    <StepButton
                      onClick={this.handleStep(index)}
                      completed={this.state.completed[index]}
                    >
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
                      {this.getStepContent(
                        activeStep,
                        me,
                        property,
                        application
                      )}
                    </Typography>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={this.handleBack}
                        className={classes.button}
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        className={classes.button}
                      >
                        Next
                      </Button>
                      {activeStep !== steps.length &&
                        (this.state.completed[this.state.activeStep] ? (
                          <Typography
                            variant="caption"
                            className={classes.completed}
                          >
                            Step {activeStep + 1} already completed
                          </Typography>
                        ) : (
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleComplete}
                          >
                            {this.completedSteps() === this.totalSteps() - 1
                              ? "Finish"
                              : "Complete Step"}
                          </Button>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </Mutation>
      </div>
    );
  }
  // Validation on step Save
  _saveUserDetails = userInfo => {
    console.log("OK Lets save the details we have yea? ", userInfo);
  };
}

RentalApplicationStepper.propTypes = {
  classes: PropTypes.object,
  me: PropTypes.object,
  property: PropTypes.object
};

export default withStyles(styles)(RentalApplicationStepper);
