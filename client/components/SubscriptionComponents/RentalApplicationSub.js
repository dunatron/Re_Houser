import { useContext, useState } from 'react';
import { useSubscription } from '@apollo/client';
import { RENTAL_APPLICATION_SUBSCRIPTION } from '@/Gql/subscriptions/RentalApplicationSub';
import { CURRENT_USER_QUERY } from '@/Gql/queries/index';

import Error from '@/Components/ErrorMessage';
import Loader from '@/Components/Loader';

const RentalApplicationSub = ({ me, variables, onSubscriptionData }) => {
  // ToDo Write rentalApplicationSUb
  const { loading, data, error } = useSubscription(RENTAL_APPLICATION_SUBSCRIPTION, {
    variables: variables,
    onSubscriptionData: onSubscriptionData, // pass client and data up to parent
    // variables: {
    //   where: {
    //     node: {
    //       id: me.id,
    //     },
    //   },
    // },
    // onSubscriptionData: ({ client, subscriptionData }) => {

    // },
  });
  if (loading) return <div>SUBSCRIBING TO: Rental Application Sub</div>;
  if (error) {
    return (
      <div>
        Not SUbScribed To: RENTAL_APPLICATION_SUBSCRIPTION
        <Error error={error} />
      </div>
    );
  }
  return <div>SUBSCRIBED TO: Rental Application Updates</div>;
  return null;
};

export default RentalApplicationSub;
