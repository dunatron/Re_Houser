import { useContext } from 'react';
import { useSubscription } from '@apollo/client';
import { USER_SUBSCRIPTION } from '@/Gql/subscriptions/UserSubscription';
import { CURRENT_USER_QUERY } from '@/Gql/queries/index';

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
        'GeneralUserUpdatesSub: onSubscriptionData => ',
        subscriptionData
      );
      client.writeQuery({
        query: CURRENT_USER_QUERY,
        data: {
          me: {
            ...subscriptionData.data.userSub.node,
          },
        },
      });

      // User:ckgiqg63gf28o0999py6ashcb
      // client.cache.modify({
      //   fields: {
      //     me(existingMeRef, { readField }) {
      //       console.log(
      //         'GeneralUserUpdatesSub: existing me ref => ',
      //         existingMeRef
      //       );
      //       const meData = readField('id', existingMeRef);
      //       console.log('GeneralUserUpdatesSub: meData => ', meData);
      //       // return 'zzzzz';
      //       return existingMeRef;
      //     },
      //   },
      // });
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
  return <div>Not SUbScribed To: USER_SUBSCRIPTION</div>
  return "NOT SUBSCRIBED TO USER_SUBSCRIPTION";
  return null;
};

export default GeneralUserUpdatesSub;
