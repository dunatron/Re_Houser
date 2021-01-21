import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, NetworkStatus } from '@apollo/client';
import PropTypes from 'prop-types';

import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Error from '@/Components/ErrorMessage/index';
import Loader from '@/Components/Loader/index';
import ChangeRouteButton from '@/Components/Routes/ChangeRouteButton';

import { SINGLE_RENTAL_APPLICATION_QUERY } from '@/Gql/queries/index';
import RentalApplicationStepper from './Stepper';

const ConnectedRentalApplicationStepper = ({
  me,
  property,
  application,
  applicationId,
}) => {
  const rentalApplication = useQuery(SINGLE_RENTAL_APPLICATION_QUERY, {
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    variables: {
      where: { id: application ? application.id : applicationId },
    },
  });

  const { data, loading, error, refetch, networkStatus } = rentalApplication;

  // if (loading) return <Loader loading={loading} text="Loading application" />;
  // lets see if instead, we can have the data refetched and it goes to where it needs to
  // i.e perhaps remove the local values for some things. or keep track of the step?
  // best approach is to perhaps have loading, and refetching prop. Then have useEffects for changes in the rentalApplication and then do things for the indiviodual components
  // if (networkStatus === NetworkStatus.refetch) return 'Refetching!';
  if (error) return <Error error={error} text="Loading Application" />;

  if (!data)
    return <Loader loading={!data} text="waiting for application data" />;

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
          // <ChangeRouteButton
          //   route="/tenant/leases/lease"
          //   query={{
          //     id: data.rentalApplication.leaseId,
          //   }}
          // />
          <ChangeRouteButton
            route={`/tenant/leases/${data.rentalApplication.leaseId}`}
          />
        )}
      </Paper>
    );

  return (
    <>
      <RentalApplicationStepper
        me={me}
        refetching={networkStatus === NetworkStatus.refetch}
        property={data.rentalApplication.property}
        rentalApplication={data.rentalApplication}
        refetch={() => {
          refetch();
        }}
      />
    </>
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
