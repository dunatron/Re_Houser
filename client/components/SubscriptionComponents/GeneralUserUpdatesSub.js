import { useContext } from 'react';
import { useSubscription } from '@apollo/client';
import { USER_SUBSCRIPTION } from '@/Gql/subscriptions/UserSubscription';
import { CURRENT_USER_QUERY } from '@/Gql/queries/index';

import Error from '@/Components/ErrorMessage';
import Loader from '@/Components/Loader';

const GeneralUserUpdatesSub = ({ me }) => {
  const { loading, data, error } = useSubscription(USER_SUBSCRIPTION, {
    suspend: false,
    variables: {
      where: {
        node: {
          id: me.id,
        },
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
  if (loading) return null;
  if (error) {
    return (
      <div>
        Not SUbScribed To: USER_SUBSCRIPTION
        <Error error={error} />
      </div>
    );
  }
  return null;
};

export default GeneralUserUpdatesSub;
