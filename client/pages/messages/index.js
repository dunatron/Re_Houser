import PropTypes from 'prop-types';
import PageHeader from '@/Components/PageHeader';
import RChat from '@/Components/RChat';
import ChatsListScreen from '@/Components/ChatsListScreen';

const MessagesPage = ({ appData: { currentUser } }) => {
  const me = currentUser.data ? currentUser.data.me : null;
  return (
    <>
      <PageHeader
        title="Messages"
        intro="This is where you can find a list of chats from people you have interacted with on the system"
        metaData={{
          title: 'Messages',
          content:
            'This is where you can find a list of chats from people you have interacted with on the system',
        }}
      />
      <ChatsListScreen me={me} />
      <RChat />
    </>
  );
};

MessagesPage.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object.isRequired,
  }),
};

export default MessagesPage;
