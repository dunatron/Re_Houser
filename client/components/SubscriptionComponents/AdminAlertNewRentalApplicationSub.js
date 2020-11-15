import { useState, useContext } from 'react';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import { toast } from 'react-toastify';
import { RENTAL_APPLICATION_SUBSCRIPTION } from '@/Gql/subscriptions/RentalApplicationSub';
import { store } from '@/Store/index';
import Error from '@/Components/ErrorMessage';
import Loader from '@/Components/Loader';

const AdminAlertNewRentalApplicationSub = () => {
  const globalStore = useContext(store);
  const { dispatch, state } = globalStore;
  const { loading, data, error } = useSubscription(
    RENTAL_APPLICATION_SUBSCRIPTION,
    {
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
  if (error) {
    return (
      <div>
        Not SUbScribed To: RENTAL_APPLICATION_SUBSCRIPTION mutation created
        <Error error={error} />
      </div>
    );
  }

  // they are just aledrts find the best way to return nothing

  return null;
};

export default AdminAlertNewRentalApplicationSub;
