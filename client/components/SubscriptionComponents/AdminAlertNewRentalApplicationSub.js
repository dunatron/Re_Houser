import { useState, useContext } from 'react';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import { toast } from 'react-toastify';
import { RENTAL_APPLICATION_SUBSCRIPTION } from '@/Gql/subscriptions/RentalApplicationSub';
import { store } from '@/Store/index';

const AdminAlertNewRentalApplicationSub = () => {
  const globalStore = useContext(store);
  const { dispatch, state } = globalStore;
  const { loading, data, error } = useSubscription(
    RENTAL_APPLICATION_SUBSCRIPTION,
    {
      suspend: false,
      variables: {
        where: {
          mutation_in: 'CREATED',
          // node: {
          //   stage_in: ["PENDING", "INITIALIZING", "DENIED", "ACCEPTED"],
          //   // id_in: applicationIds,
          //   property: {
          //     id: property.id,
          //   },
          // },
        },
      },
      onSubscriptionData: ({ client, subscriptionData }) => {
        dispatch({
          type: 'updateState',
          payload: {
            newRentalApplicationsCount: state.newRentalApplicationsCount + 1,
          },
        });
        toast.success(<p>New Pending Rental Application for</p>);
      },
    }
  );
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

export default AdminAlertNewRentalApplicationSub;
