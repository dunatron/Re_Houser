import PropTypes from 'prop-types';
import { useState } from 'react';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import { RENTAL_APPLICATION_UPDATED_SUBSCRIPTION } from '@/Gql/subscriptions/RentalApplicationUpdatedSub';
import ApplicationCard from '@/Components/PropertyDetails/ApplicationCard';
import { ToastContainer, toast } from 'react-toastify';

import Error from '@/Components/ErrorMessage'
import Loader from '@/Components/Loader'

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
  if (error) {
    return <div>Not SUbScribed To: RENTAL_APPLICATION_UPDATED_SUBSCRIPTION
      <Error  error={error}/>
    </div>
  }
  return null
};

PropertyPendingRentalApplicationsSub.propTypes = {
  property: PropTypes.shape({
    id: PropTypes.any,
    location: PropTypes.any
  }).isRequired
};

export default PropertyPendingRentalApplicationsSub;
