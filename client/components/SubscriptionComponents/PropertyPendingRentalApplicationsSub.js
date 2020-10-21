import PropTypes from 'prop-types';
import { useState } from 'react';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import { RENTAL_APPLICATION_UPDATED_SUBSCRIPTION } from '@/Gql/subscriptions/RentalApplicationUpdatedSub';
import ApplicationCard from '@/Components/PropertyDetails/ApplicationCard';
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
          No Websocket connection error in fact. You will need to manually refresh for RENTAL_APPLICATION_UPDATED_SUBSCRIPTION  updates
        </p>
      </div>
    );
  if (!error)
    toast(
      <div>
        <p>Subbed to {property.location}</p>
      </div>
    );
    return <div>Not SUbScribed To: RENTAL_APPLICATION_UPDATED_SUBSCRIPTION</div>
  return (
    <div>
      No Websocket connection. You will need to manually refresh for RENTAL_APPLICATION_UPDATED_SUBSCRIPTION updates
    </div>
  );
};

PropertyPendingRentalApplicationsSub.propTypes = {
  property: PropTypes.shape({
    id: PropTypes.any,
    location: PropTypes.any
  }).isRequired
};

export default PropertyPendingRentalApplicationsSub;
