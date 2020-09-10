import PropTypes from "prop-types";
import React, { Component } from 'react';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import { RENTAL_APPLICATIONS_QUERY } from '../../graphql/queries/index';
import { ACCEPT_RENTAL_APPLICATION_MUTATION } from '../../graphql/mutations/acceptRentalApplication';
import { RENTAL_APPLICATION_CREATED_SUBSCRIPTION } from '../../graphql/subscriptions/RentalApplicationCreatedSub';
import { RENTAL_APPLICATION_UPDATED_SUBSCRIPTION } from '../../graphql/subscriptions/RentalApplicationUpdatedSub';
import PropertyPendingRentalApplicationsSub from '../SubscriptionComponents/PropertyPendingRentalApplicationsSub';
import Loader from '../Loader';
import Error from '../ErrorMessage';
import ApplicationCard from './ApplicationCard';
import { Paper, Typography } from '@material-ui/core';
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
      <Paper>
        <Typography>
          You can handle applications for your property here
        </Typography>
        <Typography>
          Once you have accepted an application, it will create an un-signed
          lease where all lessors and lessess must sign the lease before it can
          be finalised. A lessor must finalise the lease once all parties have
          signed
        </Typography>
        <Typography>
          Heath do we need a little more control on this? like I just want this
          airtight
        </Typography>
        INITIALIZING PAID SIGNED
        <ul>
          <li>INITIALIZING</li>
          <li>All parties sign - can finalise button appears</li>
          <li>Lessor finalises - SIGNED</li>
          <li>lesses pay - PAID</li>
        </ul>
      </Paper>

      {data.rentalApplications.map((application, i) => {
        return (
          <ApplicationCard
            key={application.id}
            application={application}
            property={props.property}
          />
        );
      })}
    </div>
  );
};

RentalApplications.propTypes = {
  property: PropTypes.shape({
    id: PropTypes.any
  }).isRequired
}

export default RentalApplications;
