import GeneralUserUpdatesSub from '../components/SubscriptionComponents/GeneralUserUpdatesSub';
import ChatCreatedSub from '../components/SubscriptionComponents/ChatCreatedSub';
import MessageCreatedSub from '../components/SubscriptionComponents/MessageCreatedSub';
import User from '../components/User/index';

const GeneralSubsContainer = props => {
  return (
    <>
      <User>
        {({ data }) => {
          const me = data ? data.me : null;
          if (!me) return null;
          console.log('Me in general Subs. SHould pass => ', me);
          return (
            <>
              <GeneralUserUpdatesSub me={me} />
              <ChatCreatedSub me={me} />
              <MessageCreatedSub me={me} />
            </>
          );
        }}
      </User>
    </>
  );
};

export default GeneralSubsContainer;
