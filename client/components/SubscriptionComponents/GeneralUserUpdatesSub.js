import { useContext, useState } from 'react';
import { useSubscription } from '@apollo/client';
import { USER_SUBSCRIPTION } from '@/Gql/subscriptions/UserSubscription';
import { CURRENT_USER_QUERY } from '@/Gql/queries/index';

import Error from '@/Components/ErrorMessage';
import Loader from '@/Components/Loader';

const GeneralUserUpdatesSub = ({ me }) => {
  console.log('me in general user updates => ', me);
  const { loading, data, error } = useSubscription(USER_SUBSCRIPTION, {
    variables: {
      where: {
        node: {
          id: me.id,
        },
      },
    },

    onSubscriptionData: ({ client, subscriptionData }) => {
      console.log('User subscriptionData => ', subscriptionData);
      const subDta = subscriptionData.data.userSub.node;
      // Subs shouldnt handle our private files in the cache
      if (subDta.photoIdentification) delete subDta.photoIdentification;
      if (subDta.proofOfAddress) delete subDta.proofOfAddress;
      if (subDta.signature) delete subDta.signature;

      const oldMe = me;
      const newMe = {
        ...me,
        ...subDta,
      };

      // cache.modify({
      //   id: cache.identify(myObject),
      //   fields: {
      //     name(cachedName) {
      //       return cachedName.toUpperCase();
      //     },
      //   },
      //   /* broadcast: false // Include this to prevent automatic query refresh */
      // });

      // console.log('OLD ME => ', oldMe);
      // console.log('NEW ME => ', newMe);

      // // We will get subs back about Files that we may be able to see but the pushNotifications dont know that and send stock image
      client.writeQuery({
        query: CURRENT_USER_QUERY,
        data: {
          me: newMe,
        },
      });
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

const MemoizedGeneralUserUpdatesSub = React.memo(GeneralUserUpdatesSub);

export default GeneralUserUpdatesSub;
