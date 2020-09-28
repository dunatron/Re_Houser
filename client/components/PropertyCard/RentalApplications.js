import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ApplicationItem from './ApplicationItem';
import { RENTAL_APPLICATIONS_QUERY } from '@/Gql/queries/index';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import { RENTAL_APPLICATION_CREATED_SUBSCRIPTION } from '@/Gql/subscriptions/RentalApplicationCreatedSub';
import Error from '@/Components/ErrorMessage';
import Loader from '@/Components/Loader';
import { useCurrentUser } from '@/Components/User';

const RentalApplications = ({ openRentalAppModal, property }) => {
  const me = useCurrentUser();
  const variables = {
    where: {
      OR: [
        {
          visibility: 'PUBLIC',
        },
        {
          owner: {
            id: me.id,
          },
        },
      ],
      AND: {
        property: {
          id: property.id,
        },
      },
    },
  };
  const applications = useQuery(RENTAL_APPLICATIONS_QUERY, {
    variables: variables,
  });
  const { data, error, loading } = useSubscription(
    RENTAL_APPLICATION_CREATED_SUBSCRIPTION,
    {
      onSubscriptionData: ({ client, subscriptionData }) => {
        const applications = client.readQuery({
          query: RENTAL_APPLICATIONS_QUERY,
          variables: variables,
        });
        const applicationId =
          subscriptionData.data.rentalApplicationCreatedSub.node.id;
        client.writeQuery({
          query: RENTAL_APPLICATIONS_QUERY,
          data: applications,
          variables: variables,
        });
      },
      // ... rest options
    }
  );
  if (applications.error) return <Error error={applications.error} />;
  if (applications.loading)
    return <Loader loading={loading} text="fetching applications..." />;
  const { rentalApplications } = applications.data;

  return (
    <div>
      {rentalApplications &&
        rentalApplications.map((application, idx) => {
          return (
            <ApplicationItem
              key={application.id}
              application={application}
              index={idx}
              property={property}
              openRentalAppModal={rentalData => openRentalAppModal(rentalData)}
            />
          );
        })}
    </div>
  );
};

RentalApplications.propTypes = {
  openRentalAppModal: PropTypes.func.isRequired,
  property: PropTypes.any.isRequired,
};

export default RentalApplications;
