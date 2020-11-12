import { useContext } from 'react';
import { useSubscription } from '@apollo/client';
import { toast } from 'react-toastify';
import { PROPERTY_APPRAISAL_SUBSCRIPTION } from '@/Gql/subscriptions/PropertyAppraisalSub';
import { store } from '@/Store/index';
import Error from '@/Components/ErrorMessage';
import Loader from '@/Components/Loader';

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
        dispatch({
          type: 'updateState',
          payload: {
            newRentalAppraisalCount: state.newRentalAppraisalCount + 1,
          },
        });
        toast.success(<p>New Rental Appraisal has been requested</p>);
      },
    }
  );

  if (loading) return null;
  if (error) {
    return (
      <div>
        Not SUbScribed To: PROPERTY_APPRAISAL_SUBSCRIPTION
        <Error error={error} />
      </div>
    );
  }
  return null;
};

export default AdminNewRentalAppraisalSub;
