import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import { RENTAL_APPLICATIONS_QUERY } from '@/Gql/queries/index';
import { ACCEPT_RENTAL_APPLICATION_MUTATION } from '@/Gql/mutations/acceptRentalApplication';
import { RENTAL_APPLICATION_CREATED_SUBSCRIPTION } from '@/Gql/subscriptions/RentalApplicationCreatedSub';
import { RENTAL_APPLICATION_UPDATED_SUBSCRIPTION } from '@/Gql/subscriptions/RentalApplicationUpdatedSub';
import PropertyPendingRentalApplicationsSub from '@/Components/SubscriptionComponents/PropertyPendingRentalApplicationsSub';
import Loader from '@/Components/Loader';
import Error from '@/Components/ErrorMessage';
import ApplicationCard from './ApplicationCard';
import { Box, Paper, Typography } from '@material-ui/core';
import { toast } from 'react-toastify';

const RentalApplications = props => {
  const { data, error, loading } = useQuery(RENTAL_APPLICATIONS_QUERY, {
    variables: {
      where: {
        property: {
          id: props.property.id,
        },
        stage_in: ['PENDING', 'ACCEPTED'],
      },
    },
    suspend: false,
  });

  const applicationIds = loading
    ? []
    : data.rentalApplications.map(application => application.id);

  //
  useSubscription(RENTAL_APPLICATION_UPDATED_SUBSCRIPTION, {
    variables: {
      where: {
        mutation_in: 'UPDATED',
        node: {
          stage_in: ['PENDING', 'INITIALIZING', 'DENIED', 'ACCEPTED'],
          id_in: applicationIds,
        },
      },
    },
    onSubscriptionData: ({ client, subscriptionData }) => {
      toast.info(<h3>Application is now in Pending mode</h3>);
    },
    // ... rest options
  });

  if (loading)
    return (
      <Loader loading={loading} text="fetching applications please wait...." />
    );
  if (error) return <Error error={error} />;
  return (
    <div>
      {/* <PropertyPendingRentalApplicationsSub property={props.property} /> */}
      <Paper
        style={{
          padding: '16px',
        }}>
        <Typography gutterBottom>
          You can handle applications for your property here.
        </Typography>
        <Typography gutterBottom>
          Once you have accepted an application, it will create an un-signed
          lease where all lessors and lessees must sign the lease before it can
          be finalised. A lessor must finalise the lease once all parties have
          signed.
        </Typography>
        <Typography gutterBottom>
          If the property is rehouserManaged then admins must sign the lease instead.
        </Typography>
      </Paper>

      {data.rentalApplications.map((application, i) => {
        return (
          <ApplicationCard
            key={application.id}
            application={application}
            property={props.property}
            me={props.me}
          />
        );
      })}
    </div>
  );
};

RentalApplications.propTypes = {
  property: PropTypes.shape({
    id: PropTypes.any,
  }).isRequired,
};

export default RentalApplications;
