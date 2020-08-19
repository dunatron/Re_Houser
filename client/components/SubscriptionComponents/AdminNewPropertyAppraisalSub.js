import { useState, useContext } from 'react';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import { toast } from 'react-toastify';
// import { RENTAL_APPLICATION_SUBSCRIPTION } from '../../graphql/subscriptions/RentalApplicationSub';
import { PROPERTY_APPRAISAL_SUBSCRIPTION } from '../../graphql/subscriptions/PropertyAppraisalSub';
import ApplicationCard from '../PropertyDetails/ApplicationCard';
import { store } from '../../store';

const AdminNewRentalAppraisalSub = () => {
  const globalStore = useContext(store);
  const { dispatch, state } = globalStore;
  const { loading, data, error } = useSubscription(
    PROPERTY_APPRAISAL_SUBSCRIPTION,
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
        console.log(
          'recieved new appraisal data from subscription => ',
          subscriptionData
        );
        dispatch({
          type: 'updateState',
          payload: {
            newRentalAppraisalCount: state.newRentalAppraisalCount + 1,
          },
        });
        toast.success(<p>New Rental APpraisal has been requested</p>);
      },
    }
  );
  if (loading) {
    return null;
  }
  if (error)
    return (
      <div>
        No Websocket connection. You will need to manually refresh for updates
      </div>
    );

  return null;
};

export default AdminNewRentalAppraisalSub;
