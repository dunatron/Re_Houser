import { useContext } from 'react';
import { useSubscription } from '@apollo/client';
import { USER_SUBSCRIPTION } from '../../graphql/subscriptions/UserSubscription';



const GeneralUserUpdatesSub = ({ me }) => {
  const { loading, data, error } = useSubscription(USER_SUBSCRIPTION, {
    suspend: false,
    variables: {
      where: {
        node: {
          id: me.id,
        },
        // mutation_in: 'CREATED',
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
        'recieved USER UPDATES THROUGH A SUBSCRIPTION => ',
        subscriptionData
      );
    },
  });
  // if (loading) return null;
  if (loading) {
    console.log('GeneralUserUpdatesSub: Loading sub');
    return null;
  }
  if (error) {
    console.log('GeneralUserUpdatesSub: error => ', error);
  }
  return null;
};

export default GeneralUserUpdatesSub;
