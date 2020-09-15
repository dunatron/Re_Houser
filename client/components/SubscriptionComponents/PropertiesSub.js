import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import { toast } from 'react-toastify';
// import { RENTAL_APPLICATION_SUBSCRIPTION } from '../../graphql/subscriptions/RentalApplicationSub';
import { PROPERTY_SUBSCRIPTION } from '@/Gql/subscriptions/PropertySubscription';
import ApplicationCard from '@/Components/PropertyDetails/ApplicationCard';
import { store } from '@/Store/index';

const PropertiesSub = ({ where }) => {
  const globalStore = useContext(store);
  const { dispatch, state } = globalStore;
  const { loading, data, error } = useSubscription(PROPERTY_SUBSCRIPTION, {
    suspend: false,
    variables: {
      where: {
        ...where,
      },
    },
    onSubscriptionData: ({ client, subscriptionData }) => {
      dispatch({
        type: 'updateState',
        payload: {
          newPropertiesCount: state.newPropertiesCount + 1,
        },
      });
      toast.success(<p>New Rental APpraisal has been requested</p>);
    },
  });
  console.log('subscription: Properties 1');
  if (loading) return null;
  console.log('subscription: Properties 2');
  if (error)
    return (
      <div>
        No Websocket connection. You will need to manually refresh for updates
      </div>
    );
  console.log('subscription: Properties 3');
  return null;
};

PropertiesSub.propTypes = {
  where: PropTypes.any.isRequired,
};

export default PropertiesSub;
