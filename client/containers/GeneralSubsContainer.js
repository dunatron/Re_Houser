import GeneralUserUpdatesSub from '../components/SubscriptionComponents/GeneralUserUpdatesSub';
import ChatCreatedSub from '../components/SubscriptionComponents/ChatCreatedSub';
import MessageCreatedSub from '../components/SubscriptionComponents/MessageCreatedSub';
import { useCurrentUser } from '@/Components/User';
import Loader from '@/Components/Loader';
import Error from '@/Components/ErrorMessage';

const GeneralSubsContainer = props => {
  const { data, error, loading } = useCurrentUser();

  if (loading)
    return (
      <Loader loading={loading} text="Loading your data for general subs" />
    );

  if (error) return <Error error={error} />;
  if (!data) return null;
  const me = data.me;

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
