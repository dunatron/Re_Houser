import React, { Component } from 'react';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import { RENTAL_APPLICATIONS_QUERY } from '../../graphql/queries/index';
import { ACCEPT_RENTAL_APPLICATION_MUTATION } from '../../graphql/mutations/acceptRentalApplication';
import { RENTAL_APPLICATION_CREATED_SUBSCRIPTION } from '../../graphql/subscriptions/RentalApplicationCreatedSub';
import { RENTAL_APPLICATION_UPDATED_SUBSCRIPTION } from '../../graphql/subscriptions/RentalApplicationUpdatedSub';
import PropertyPendingRentalApplicationsSub from '../SubscriptionComponents/PropertyPendingRentalApplicationsSub';

import ApplicationCard from './ApplicationCard';

// INITIALIZING
// PENDING
// DENIED
// ACCEPTED
const RentalApplications = props => {
  const { data, error, loading } = useQuery(RENTAL_APPLICATIONS_QUERY, {
    variables: {
      where: {
        property: {
          id: props.property.id,
        },
        // stage: "PENDING",
        stage_in: ['PENDING', 'ACCEPTED'],
      },
    },
    suspend: false,
  });

  const applicationIds = loading
    ? []
    : data.rentalApplications.map(application => application.id);
  /**
   * JUST NOT USING FOR NOW
  useSubscription(RENTAL_APPLICATION_UPDATED_SUBSCRIPTION, {
    variables: {
      where: {
        mutation_in: "UPDATED",
        node: {
          stage_in: ["PENDING", "INITIALIZING", "DENIED", "ACCEPTED"],
          id_in: applicationIds,
        },
      },
    },
    onSubscriptionData: ({ client, subscriptionData }) => {
      toast.info(<h3>Application is now in Pending mode</h3>)
    },
    // ... rest options
  })
   */

  // useSubscription(RENTAL_APPLICATION_CREATED_SUBSCRIPTION, {
  //   // variables: {
  //   //   // ...
  //   // },
  //   onSubscriptionData: ({ client, subscriptionData }) => {
  //     const applications = client.readQuery({
  //       query: RENTAL_APPLICATIONS_QUERY,
  //       variables: {
  //         where: {
  //           property: {
  //             id: props.property.id,
  //           },
  //         },
  //       },
  //     })
  //     applications.rentalApplications.push(
  //       subscriptionData.data.rentalApplicationCreatedSub.node
  //     )
  //     client.writeQuery({
  //       query: RENTAL_APPLICATIONS_QUERY,
  //       data: {
  //         ...applications.rentalApplications,
  //       },
  //       variables: {
  //         where: {
  //           property: {
  //             id: props.property.id,
  //           },
  //         },
  //       },
  //     })
  //   },
  //   // ... rest options
  // })

  if (loading) {
    return <div>fetching applications please wait....</div>;
  }
  if (error) {
    return <div>Error! {error.message}</div>;
  }
  return (
    <div>
      <h1>I am the Applications details component</h1>
      {/* <PropertyPendingRentalApplicationsSub property={props.property} /> */}
      <div>
        <h2>This area is to perform actions for potential applications e.g.</h2>
        <ul>
          <li>Send email and notification to applicants about a viewing</li>
        </ul>
      </div>

      {data.rentalApplications.map((application, i) => {
        return (
          <ApplicationCard
            application={application}
            property={props.property}
          />
        );
      })}
    </div>
  );
};

export default RentalApplications;
