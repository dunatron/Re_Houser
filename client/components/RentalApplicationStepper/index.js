import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import {
  ButtonGroup,
  Button,
  Paper,
  StepButton,
  StepContent,
  StepLabel,
  Step,
  Stepper,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Error from '@/Components/ErrorMessage/index';
import Loader from '@/Components/Loader/index';
import ChangeRouteButton from '@/Components/Routes/ChangeRouteButton';
// Steps
import UserDetailsStep from './steps/UserDetailsStep';
import ApplicationDetailsStep from './steps/ApplicationDetailsStep';
import PreTenancyStep from './steps/PreTenancyStep';
import FinaliseApplicationStep from './steps/FinaliseApplicationStep';
// configs
import { RENTAL_GROUP_APPLICANT_CONF } from '@/Lib/configs/rentalGroupApplicantConfig';
import customErrorsBag from '@/Lib/errorsBagGenerator';
import {
  UPDATE_RENTAL_APPLICATION_MUTATION,
  UPDATE_RENTAL_GROUP_APPLICANT_MUTATION,
  UPDATE_USER_MUTATION,
} from '@/Gql/mutations/index';

import { SINGLE_RENTAL_APPLICATION_QUERY } from '@/Gql/queries/index';

import { isEmpty } from 'ramda';

const useStyles = makeStyles(theme => ({
  root: {
    width: '90%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  completed: {
    // display: 'inline-block',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

/**
 * Step Headers
 */
const getSteps = () => {
  return ['My Details', 'Application Details', 'Pre Tenancy', 'Finalise'];
};

const extractApplicantUserData = (rentalApplication, me) => {
  const userRentalApplicantData = rentalApplication.applicants.find(
    applicant => applicant.user.id === me.id
  );
  return userRentalApplicantData;
};

const editableMeData = me => ({
  firstName: {
    label: 'First Name',
    value: me.firstName,
    editable: false,
  },
  lastName: {
    label: 'First Name',
    value: me.lastName,
    editable: false,
  },
  email: {
    label: 'First Name',
    value: me.email,
    editable: false,
  },
});

const RentalApplicationStepper = props => {
  const { me, property, rentalApplication } = props;
  const { applicants } = rentalApplication;
  const classes = useStyles();
  const [updateApplication, updateApplicationProps] = useMutation(
    UPDATE_RENTAL_APPLICATION_MUTATION
  );
  // 2. update rental group applicant mutation
  const [updateRentalGroupApplicant] = useMutation(
    UPDATE_RENTAL_GROUP_APPLICANT_MUTATION
  );

  // an update user Mutation
  const [updateUser] = useMutation(UPDATE_USER_MUTATION);

  // Note: all hooks must go before first render
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [userInfo, setUserInfo] = useState(editableMeData(me));
  const [applicationInfo, setApplicationInfo] = useState({});
  const [userErrorsBag, setUserErrorsBag] = useState({});

  const applicantData = extractApplicantUserData(rentalApplication, me);

  console.log('applicantData => ', applicantData);

  const userRentalApplicantData = rentalApplication.applicants.find(
    applicant => applicant.user.id === me.id
  );

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

  const handleDetailsChange = e => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: {
        ...userInfo[e.target.name],
        value: e.target.value,
      },
    });
  };
  const getStepContent = (step, me, property, rentalApplication) => {
    switch (step) {
      case 0:
        return (
          <UserDetailsStep
            me={me}
            property={property}
            rentalApplication={rentalApplication}
            userInfo={userInfo}
            onChange={handleDetailsChange}
            errorsBag={userErrorsBag}
            completed={completed[step]}
            applicantData={applicantData}
            updateRentalGroupApplicant={updateRentalGroupApplicant}
          />
        );
      case 1:
        return (
          <ApplicationDetailsStep {...props} completed={completed[step]} />
        );
      case 2:
        return (
          <PreTenancyStep
            {...props}
            completed={completed[step]}
            updateUser={updateUser}
          />
        );
      case 3:
        return (
          <FinaliseApplicationStep
            {...props}
            stepHeaders={getSteps()}
            completed={completed}
          />
        );
      default:
        return 'Unknown step';
    }
  };

  const totalSteps = () => getSteps().length;

  const handleNext = async () => {
    switch (activeStep) {
      case 0: {
        const didSave = await _saveUserDetails(userInfo);
        if (!didSave) {
          return;
        }
        break;
      }
      case 1: {
        break;
      }
      case 2: {
        if (!applicantData.preTenancyApplicationForm) {
          alert('You need to submit a preTenancy Form');
          return;
        }
        if (!applicantData.preTenancyApplicationForm.proofOfAddress) {
          alert(
            'You need to have a proof of address file on your pre tenancy form'
          );
          return;
        }
        break;
      }
    }

    let currStep = activeStep;
    if (isLastStep() && !allStepsCompleted()) {
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

  const handleStep = step => async () => {
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
        const hasOneApplicantApproved = applicants.find(
          aplcnt => aplcnt.approved === true
        );
        if (!hasOneApplicantApproved) {
          alert('You need to have at least 1 applicant approved');
          return;
        }
        break;
      }
      case 2: {
        if (!applicantData.preTenancyApplicationForm) {
          alert('You need to submit a preTenancy Form');
          return;
        }
        break;
      }
    }
    completed[activeStep] = true;
    setCompleted(completed);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

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
      case 2: {
        return (
          <Button variant="contained" color="primary" onClick={handleComplete}>
            Complete Pre tenancy step
          </Button>
        );
      }
      default: {
        // return null; // handling complete on that functionas the application should self update at steps. this just submits it
        return (
          <Button variant="contained" color="primary" onClick={handleComplete}>
            Finish
          </Button>
        );
      }
    }
  };

  // Validation on step Save
  const _saveUserDetails = async () => {
    if (!me.photoIdentification) {
      alert('You need photo ID');
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
    const userRentalApplicantData = rentalApplication.applicants.find(
      applicant => applicant.user.id === me.id
    );
    const rentalGroupApplicantData = {
      completed: true,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
    };
    updateRentalGroupApplicant({
      variables: {
        data: rentalGroupApplicantData,
        where: {
          id: userRentalApplicantData.id,
        },
      },
    });
    return true;
  };

  return (
    <div className={classes.root}>
      <Stepper
        nonLinear
        activeStep={activeStep}
        style={{ padding: '32px 0' }}
        orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton
              onClick={handleStep(index)}
              completed={completed[index]}>
              {label}
            </StepButton>
            <StepContent>
              {getStepContent(activeStep, me, property, rentalApplication)}
              <div>
                {activeStep !== steps.length && completed[activeStep] && (
                  <div>
                    <Typography variant="body1" className={classes.completed}>
                      Step {activeStep + 1} already completed
                    </Typography>
                  </div>
                )}
                <ButtonGroup
                  style={{
                    margin: '16px 0',
                  }}>
                  <Button disabled={activeStep === 0} onClick={handleBack}>
                    Back
                  </Button>
                  {activeStep !== steps.length && completed[activeStep] && (
                    <Button
                      onClick={() => {
                        setCompleted({ ...completed, [activeStep]: false });
                      }}>
                      Redo Section
                    </Button>
                  )}
                  <Button onClick={handleNext} disabled={isLastStep()}>
                    Next
                  </Button>
                </ButtonGroup>
              </div>
            </StepContent>
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
            {/* <Typography className={classes.instructions} component="div">
              {getStepContent(activeStep, me, property, rentalApplication)}
            </Typography> */}
          </div>
        )}
      </div>
    </div>
  );
};

RentalApplicationStepper.propTypes = {
  me: PropTypes.shape({
    id: PropTypes.any,
    photoIdentification: PropTypes.any,
  }).isRequired,
  property: PropTypes.any.isRequired,
  rentalApplication: PropTypes.shape({
    applicants: PropTypes.shape({
      find: PropTypes.func,
    }),
  }).isRequired,
};

const ConnectedRentalApplicationStepper = ({
  me,
  property,
  application,
  applicationId,
}) => {
  const rentalApplication = useQuery(SINGLE_RENTAL_APPLICATION_QUERY, {
    variables: {
      where: { id: application ? application.id : applicationId },
    },
  });

  console.log('rental application => ', rentalApplication);

  const { data, loading, error } = rentalApplication;

  if (loading) return <Loader loading={loading} />;
  if (error) return <Error error={error} text="Loading Application" />;

  if (data.rentalApplication.stage === 'PENDING')
    return 'Application is pending a response from the landlord';
  if (data.rentalApplication.stage === 'ACCEPTED')
    return (
      <Paper>
        <Typography>
          Application has been accepted, head over to leases to sign{' '}
          {data.rentalApplication.leaseId}
        </Typography>
        {data.rentalApplication.leaseId && (
          <ChangeRouteButton
            route="/tenant/leases/lease"
            query={{
              id: data.rentalApplication.leaseId,
            }}
          />
        )}
      </Paper>
    );

  return (
    <RentalApplicationStepper
      me={me}
      property={data.rentalApplication.property}
      rentalApplication={data.rentalApplication}
    />
  );
};

// PropTypes
ConnectedRentalApplicationStepper.propTypes = {
  me: PropTypes.object.isRequired,
  application: PropTypes.shape({
    stage: PropTypes.string,
    visibility: PropTypes.string,
    __typename: PropTypes.string,
    applicants: PropTypes.arrayOf(
      PropTypes.shape({
        __typeName: PropTypes.string,
        approved: PropTypes.bool,
        completed: PropTypes.bool,
        email: PropTypes.string,
        firstName: PropTypes.sting,
        id: PropTypes.string,
        lastName: PropTypes.string,
        user: PropTypes.shape(
          PropTypes.shape({
            id: PropTypes.string,
            firsName: PropTypes.string,
            lastName: PropTypes.string,
          })
        ),
      })
    ),
  }),
  property: PropTypes.shape({
    carportSpaces: PropTypes.number,
    garageSpaces: PropTypes.number,
    highestRoomPrice: PropTypes.number,
    imageUrls: PropTypes.arrayOf(PropTypes.string),
    indoorFeature: PropTypes.arrayOf(PropTypes.string),
    outdoorFeature: PropTypes.arrayOf(PropTypes.string),
    location: PropTypes.string,
    LocationLat: PropTypes.number,
    locationLng: PropTypes.number,
    moveInDate: PropTypes.string,
    move_in_date_timestamp: PropTypes.number,
    objectID: PropTypes.string,
    offStreetSpaces: PropTypes.number,
    onTheMarket: PropTypes.bool,
    rent: PropTypes.number,
    rooms: PropTypes.number,
    type: PropTypes.string,
    accommodation: PropTypes.arrayOf(
      PropTypes.shape({
        description: PropTypes.string,
        expenses: PropTypes.number,
        id: PropTypes.string,
        rent: PropTypes.number,
        roomSize: PropTypes.number,
      })
    ),
  }),
};

export default ConnectedRentalApplicationStepper;
