import GeneralUserUpdatesSub from '../components/SubscriptionComponents/GeneralUserUpdatesSub';
import ChatCreatedSub from '../components/SubscriptionComponents/ChatCreatedSub';
import MessageCreatedSub from '../components/SubscriptionComponents/MessageCreatedSub';
import User from '../components/User/index';

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

export default GeneralSubsContainer;
