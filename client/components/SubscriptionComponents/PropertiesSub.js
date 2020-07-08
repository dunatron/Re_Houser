import { useState, useContext } from 'react';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import { toast } from 'react-toastify';
// import { RENTAL_APPLICATION_SUBSCRIPTION } from '../../graphql/subscriptions/RentalApplicationSub';
import { PROPERTY_SUBSCRIPTION } from '../../graphql/subscriptions/PropertySubscription';
import ApplicationCard from '../PropertyDetails/ApplicationCard';
import { store } from '../../store';

/**
 *
 * @param {*} param0
 * THE SMART MONEY SAYS: implement these quickly everywhere by providing the simple skeleton.
 * collect, number of updates, implement refreshQueries || provide a child component
 * child component i.e instead of <ApplicationCard /> use <Component component={child} {...props} />
 * child component i.e instead of <ApplicationCard /> use <Component component={child} {...props} />
 * Na too much. This is the explicit phase. Compiose heaps of these guys and pass in dumb components, that can do smart things wityhin reason.
 *
 */
/**
 * This should m,aybe create a context, newItemsCOunt
 */
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

export default PropertiesSub;