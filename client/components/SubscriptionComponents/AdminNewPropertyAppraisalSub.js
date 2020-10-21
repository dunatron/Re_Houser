import { useContext } from 'react';
import { useSubscription } from '@apollo/client';
import { toast } from 'react-toastify';
import { PROPERTY_APPRAISAL_SUBSCRIPTION } from '@/Gql/subscriptions/PropertyAppraisalSub';
import { store } from '@/Store/index';

const AdminNewRentalAppraisalSub = () => {
  const globalStore = useContext(store);
  const { dispatch, state } = globalStore;
  const { loading, data, error } = useSubscription(
    PROPERTY_APPRAISAL_SUBSCRIPTION,
    {
      // suspend: false,
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
  console.log('subscription: RentalAppraisal 1');
  if (loading) {
    return null;
  }
  console.log('subscription: RentalAppraisal 2');
  if (error)
    return (
      <div>
        No Websocket connection. You will need to manually refresh for PROPERTY_APPRAISAL_SUBSCRIPTION updates
      </div>
    );
  console.log('subscription: RentalAppraisal 3');
  return <div>Not SUbScribed To: PROPERTY_APPRAISAL_SUBSCRIPTION</div>
  return null;
};

export default AdminNewRentalAppraisalSub;
