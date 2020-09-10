import { useState } from 'react';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import { RENTAL_APPLICATION_UPDATED_SUBSCRIPTION } from '../../graphql/subscriptions/RentalApplicationUpdatedSub';
import ApplicationCard from '../PropertyDetails/ApplicationCard';
import { ToastContainer, toast } from 'react-toastify';

const PropertyPendingRentalApplicationsSub = ({ property }) => {
  const [newObjects, setNewObjects] = useState([]);
  const [updateCount, setUpdateCount] = useState(0);
  const { loading, data, error } = useSubscription(
    RENTAL_APPLICATION_UPDATED_SUBSCRIPTION,
    {
      suspend: false,
      variables: {
        where: {
          mutation_in: 'UPDATED',
          node: {
            stage_in: ['PENDING', 'INITIALIZING', 'DENIED', 'ACCEPTED'],
            property: {
              id: property.id,
            },
          },
        },
      },
      onSubscriptionData: ({ client, subscriptionData }) => {
        setUpdateCount(updateCount + 1);
        setNewObjects(
          newObjects.concat(
            subscriptionData.data.rentalApplicationUpdateSub.node
          )
        );
        toast(
          <div>
            <h1>Property Subscription</h1>
            <p>
              PropertyPendingRentalApplicationsSub iS Subscribed chefck boy and
              Css
            </p>
          </div>
        );
      },
    }
  );
  if (loading) return null;
  if (error)
    toast(
      <div>
        <p>
          No Websocket connection. You will need to manually refresh for updates
        </p>
      </div>
    );
  if (!error)
    toast(
      <div>
        <p>Subbed to {property.location}</p>
      </div>
    );
  return (
    <div>
      No Websocket connection. You will need to manually refresh for updates
    </div>
  );
};

export default PropertyPendingRentalApplicationsSub;
