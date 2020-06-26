import { useState } from 'react';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import { toast } from 'react-toastify';
// import { RENTAL_APPLICATION_SUBSCRIPTION } from '../../graphql/subscriptions/RentalApplicationSub';
import { PROPERTY_APPRAISAL_SUBSCRIPTION } from '../../graphql/subscriptions/PropertyAppraisalSub';
import ApplicationCard from '../PropertyDetails/ApplicationCard';

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
const AdminNewRentalAppraisalSub = () => {
  const [newObjects, setNewObjects] = useState([]);
  const [updateCount, setUpdateCount] = useState(0);
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
        // could try update the table cache if it is there
        setUpdateCount(updateCount + 1);
        toast.success(<p>New Rental APpraisal has been requested</p>);
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

export default AdminNewRentalAppraisalSub;
