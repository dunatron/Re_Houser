import GeneralUserUpdatesSub from '../components/SubscriptionComponents/GeneralUserUpdatesSub';
import ChatCreatedSub from '../components/SubscriptionComponents/ChatCreatedSub';
import MessageCreatedSub from '../components/SubscriptionComponents/MessageCreatedSub';
import User from '../components/User/index';
import { useCurrentUser } from '@/Components/User';

import { useSubscription } from '@apollo/client';
import { USER_SUBSCRIPTION } from '@/Gql/subscriptions/UserSubscription';

const GeneralSubsContainer = props => {
  const { data, error, loading } = useCurrentUser();
  const me = data.me;

  console.log('Me in General Subs Container => ', me);
  if (!me) return null;
  if (!me.id) return null;

  const userId = me.id;

  return (
    <>
      <GeneralUserUpdatesSub userId={userId} />
      <ChatCreatedSub userId={userId} />
      <MessageCreatedSub userId={userId} />
    </>
  );
};

const MemoizedGeneralSubsContainer = React.memo(GeneralSubsContainer);

export default MemoizedGeneralSubsContainer;
