import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Router from 'next/router';
import { useRouter } from 'next/router';

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

import isAdmin from '@/Lib/isAdmin';
import { _isRentalApplicant } from '@/Lib/_isRentalApplicant';
import { _isRentalApplicationOwner } from '@/Lib/_isRentalApplicationOwner';

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
// const getSteps = () => {
//   return ['My Details', 'Application Details', 'Pre Tenancy', 'Finalise'];
// };

const getSteps = () => {
  return [
    {
      key: 'userDetails',
      label: 'My Details',
      nextBtnTxt: 'Complete User Details',
    },
    {
      key: 'applicationDetails',
      label: 'Application Details',
      nextBtnTxt: 'Complete Application Details',
    },
    {
      key: 'preTenancyDetails',
      label: 'Pre Tenancy',
      nextBtnTxt: 'Complete Pre tenancy step',
    },
  ];
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
    label: 'Last Name',
    value: me.lastName,
    editable: false,
  },
  email: {
    label: 'Account Email',
    value: me.email,
    editable: false,
  },
});

const getStepContent = ({ stepIdx, completed, ...rest }) => {
  switch (stepIdx) {
    case 0:
      return <UserDetailsStep completed={completed[stepIdx]} {...rest} />;
    case 1:
      return (
        <ApplicationDetailsStep {...rest} completed={completed[stepIdx]} />
      );
    case 2:
      return (
        <PreTenancyStep
          {...rest}
          completed={completed[stepIdx]}
          //   updateUser={updateUser}
        />
      );
    default:
      return 'Unknown step';
  }
};

const RentalApplicationStepper = props => {
  const router = useRouter();
  const { me, property, rentalApplication, refetch, refetching } = props;
  const { owner, applicants } = rentalApplication;
  const classes = useStyles();
  const [updateApplication, updateApplicationProps] = useMutation(
    UPDATE_RENTAL_APPLICATION_MUTATION
  );
  const invited = true;
  // 2. update rental group applicant mutation
  const [updateRentalGroupApplicant] = useMutation(
    UPDATE_RENTAL_GROUP_APPLICANT_MUTATION
  );

  // some easy accessors
  const isAnAdmin = isAdmin(me);
  const isOwner = _isRentalApplicationOwner(me.id, owner);
  const isAnApplicant = _isRentalApplicant(me.id, applicants);

  const handyStepProps = {
    isAnAdmin: isAnAdmin,
    isOwner: isOwner,
    isAnApplicant: isAnApplicant,
    refetch: refetch,
    refetching: refetching,
  };

  // an update user Mutation
  const [updateUser] = useMutation(UPDATE_USER_MUTATION);

  // Note: all hooks must go before first render
  const [activeStep, setActiveStep] = useState(
    router.query.step ? parseInt(router.query.step) : 0
  );
  // const [activeStep, setActiveStep] = useState(
  //   1
  // );
  const [completed, setCompleted] = useState({});
  const [userInfo, setUserInfo] = useState(editableMeData(me));
  const [applicationInfo, setApplicationInfo] = useState({});
  const [userErrorsBag, setUserErrorsBag] = useState({});

  const applicantData = extractApplicantUserData(rentalApplication, me);

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

  const totalSteps = () => steps.length;

  const handleNext = async () => {
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
          toast('You need to have at least 1 applicant approved');
          return;
        }
        break;
      }
      case 2: {
        if (!applicantData.preTenancyApplicationForm) {
          toast('You need to submit a preTenancy Form');
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

  // Validation on step Save
  const _saveUserDetails = async () => {
    // ahh yes, because on user dteails it updates updateRentalGroupApplicant with their photoId
    if (!me.photoIdentification) {
      toast('You need photo ID');
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
      {refetching && (
        <Loader
          loading={refetching}
          text="refetching application data"
          fullScreen
        />
      )}
      <Stepper
        nonLinear
        activeStep={activeStep}
        style={{ padding: '32px 0' }}
        orientation="vertical">
        {steps.map((step, index) => {
          const isStepCompleted = completed[index];
          return (
            <Step key={step.label}>
              <StepButton
                onClick={handleStep(index)}
                completed={isStepCompleted}>
                {step.label}
              </StepButton>
              <StepContent>
                {/* This is good */}
                {activeStep === index &&
                  getStepContent({
                    stepIdx: activeStep,
                    completed,
                    me,
                    property,
                    rentalApplication,
                    userInfo,
                    applicationInfo,
                    userErrorsBag,
                    handleDetailsChange,
                    updateUser,
                    updateRentalGroupApplicant,
                    ...handyStepProps,
                  })}
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
                        Edit Section
                      </Button>
                    )}
                    <Button
                      onClick={isStepCompleted ? handleNext : handleComplete}>
                      {step.nextBtnTxt}
                    </Button>
                  </ButtonGroup>
                </div>
              </StepContent>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {allStepsCompleted() && (
          <div>
            <FinaliseApplicationStep
              {...props}
              steps={steps}
              completed={completed}
            />
            <Typography className={classes.instructions} component="div">
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset}>Close</Button>
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
  property: PropTypes.any,
  rentalApplication: PropTypes.shape({
    applicants: PropTypes.shape({
      find: PropTypes.func,
    }),
  }).isRequired,
};

export default RentalApplicationStepper;
