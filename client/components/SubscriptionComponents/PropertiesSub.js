import PropTypes from "prop-types";
import { useState, useContext } from 'react';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import { toast } from 'react-toastify';
// import { RENTAL_APPLICATION_SUBSCRIPTION } from '../../graphql/subscriptions/RentalApplicationSub';
import { PROPERTY_SUBSCRIPTION } from '../../graphql/subscriptions/PropertySubscription';
import ApplicationCard from '../PropertyDetails/ApplicationCard';
import { store } from '../../store';

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
  if (loading) return null;
  if (error)
    return (
      <div>
        No Websocket connection. You will need to manually refresh for updates
      </div>
    );
  // they are just aledrts find the best way to return nothing
  return null;
};

PropertiesSub.propTypes = {
  where: PropTypes.any.isRequired
}

export default PropertiesSub;
