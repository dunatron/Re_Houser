import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { UPDATE_RENTAL_GROUP_APPLICANT_MUTATION } from '../../../graphql/mutations/index';
import Switch from '@material-ui/core/Switch';
import SwitchInput from '../../Inputs/SwitchInput';
import ApplicantDetails from '../../ApplicantDetails/index';
import {
  RENTAL_APPLICATIONS_QUERY,
  SINGLE_RENTAL_APPLICATION_QUERY,
} from '../../../graphql/queries/index';
import Error from '../../ErrorMessage';
import ChangeApplicationVisibilityBtn from '../../MutationButtons/ChangeApplicationVisibilityButton';

import { useTheme } from '@material-ui/styles';

const ConfirmApplicant = props => {
  const { applicant, property, rentalApplication } = props;
  // ToDo: Mutation Props
  const [updateApplicant, updateApplicantProps] = useMutation(
    UPDATE_RENTAL_GROUP_APPLICANT_MUTATION,
    {
      variables: {
        data: {
          approved: !applicant.approved,
          email: applicant.email,
          firstName: applicant.firstName,
        },
        where: {
          id: applicant.id,
        },
      },
      optimisticResponse: {
        __typename: 'Mutation',
        updateRentalGroupApplicant: {
          ...applicant,
          __typename: 'RentalGroupApplicant',
          id: applicant.id,
          approved: !applicant.approved,
        },
      },
      update: (proxy, payload) => {
        const applicationData = proxy.readQuery({
          query: SINGLE_RENTAL_APPLICATION_QUERY,
          variables: {
            where: { id: rentalApplication.id },
          },
        });

        const applicantIndex = applicationData.rentalApplication.applicants.findIndex(
          user => user.id === payload.data.updateRentalGroupApplicant.id
        );

        const updatedApplicants = [
          ...applicationData.rentalApplication.applicants,
        ];
        updatedApplicants[applicantIndex] = {
          ...applicationData.rentalApplication.applicants[applicantIndex],
          ...payload.data.updateRentalGroupApplicant,
        };

        const newApplicationData = {
          ...applicationData,
          rentalApplication: {
            ...applicationData.rentalApplication,
            applicants: [...applicationData.rentalApplication.applicants],
          },
        };
        proxy.writeQuery({
          query: SINGLE_RENTAL_APPLICATION_QUERY,
          variables: {
            where: { id: rentalApplication.id },
          },
          data: newApplicationData,
        });
      },
    }
  );

  return (
    <div>
      <Error error={updateApplicantProps.error} />
      <SwitchInput
        checked={applicant.approved}
        onChange={updateApplicant}
        label="Approve Applicant"
        checkedLabel="Approved"
      />
    </div>
  );
};

const RenderOwnerView = props => {
  const { me, property, rentalApplication } = props;
  return (
    <div>
      <h1>I am the application Details step </h1>
      <StepInfo {...props} />
      <ChangeApplicationVisibilityBtn
        applicationId={rentalApplication.id}
        visibility={rentalApplication.visibility}
      />
      <div
        style={{
          display: 'grid',
        }}>
        {rentalApplication.applicants.map((applicant, i) => {
          return (
            <div key={i}>
              {applicant.user ? (
                <ApplicantDetails applicant={applicant} />
              ) : (
                'NO USER DETAILS'
              )}

              <ConfirmApplicant applicant={applicant} {...props} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const RenderPlebView = props => {
  const { rentalApplication } = props;
  return (
    <div>
      <StepInfo {...props} />
      Only the owner can edit this section. Here is the information
      <h4>visibility: {rentalApplication.visibility}</h4>
      <h4>Stage: {rentalApplication.stage}</h4>
      <h4>finalised: {rentalApplication.finalised ? 'YES ' : 'NO'}</h4>
    </div>
  );
};

const StepInfo = ({ me, property, rentalApplication }) => {
  const roomsAvailable = property.accommodation.length;
  return (
    <div>
      <p>
        There are {roomsAvailable} vacancies available, The creator of this
        application can approve upto {roomsAvailable} before submitting the
        application
      </p>
    </div>
  );
};

const ApplicationDetailsStep = props => {
  const { me, property, rentalApplication, applicantData } = props;
  if (me.id !== rentalApplication.owner.id) {
    return <RenderPlebView {...props} />;
  }
  return <RenderOwnerView {...props} />;
};

ApplicationDetailsStep.propTypes = {
  me: PropTypes.object.isRequired,
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
  rentalApplication: PropTypes.shape({
    id: PropTypes.string,
    finalised: PropTypes.bool,
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
  applicantData: PropTypes.shape({
    id: PropTypes.string,
    approved: PropTypes.bool,
    completed: PropTypes.bool,
    email: PropTypes.string,
    firstName: PropTypes.string,
    __typename: PropTypes.string,
    user: PropTypes.shape({
      id: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      __typename: PropTypes.string,
    }),
  }),
};

export default ApplicationDetailsStep;
