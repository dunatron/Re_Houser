import GeneralUserUpdatesSub from '../components/SubscriptionComponents/GeneralUserUpdatesSub';
import ChatCreatedSub from '../components/SubscriptionComponents/ChatCreatedSub';
import MessageCreatedSub from '../components/SubscriptionComponents/MessageCreatedSub';
import User from '../components/User/index';

import { useSubscription } from '@apollo/client';
import { USER_SUBSCRIPTION } from '@/Gql/subscriptions/UserSubscription';

const GeneralSubsContainer = props => {
  const {
    appData: { currentUser },
  } = props;
  const me = currentUser.data ? currentUser.data.me : null;
  if (!me) return null;
  if (!me.id) return null;
  return (
    <>
      <GeneralUserUpdatesSub me={me} />
      <ChatCreatedSub me={me} />
      <MessageCreatedSub me={me} />
    </>
  );
};

// const GeneralSubsContainer = props => {
//   const {
//     appData: { currentUser },
//   } = props;
//   const me = currentUser.data ? currentUser.data.me : null;

//   useSubscription(USER_SUBSCRIPTION, {
//     variables: {
//       where: {
//         node: {
//           id: 'our-cto-id',
//         },
//       },
//     },
//     onSubscriptionData: ({ client, subscriptionData }) => {
//       console.log('User subscriptionData => ', subscriptionData);
//     },
//   });

//   return null;
// };

export default GeneralSubsContainer;
