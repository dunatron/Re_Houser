import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import { toast } from 'react-toastify';
// import { RENTAL_APPLICATION_SUBSCRIPTION } from '../../graphql/subscriptions/RentalApplicationSub';
import { PROPERTY_SUBSCRIPTION } from '@/Gql/subscriptions/PropertySubscription';
import ApplicationCard from '@/Components/PropertyDetails/ApplicationCard';
import { store } from '@/Store/index';
import Error from '@/Components/ErrorMessage';
import Loader from '@/Components/Loader';

const PropertiesSub = ({ where }) => {
  const globalStore = useContext(store);
  const { dispatch, state } = globalStore;
  const { loading, data, error } = useSubscription(PROPERTY_SUBSCRIPTION, {
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
  if (error) {
    return (
      <div>
        Not SUbScribed To: PROPERTY_SUBSCRIPTION
        <Error error={error} />
      </div>
    );
  }
  return null;
};

PropertiesSub.propTypes = {
  where: PropTypes.any,
};

export default PropertiesSub;
