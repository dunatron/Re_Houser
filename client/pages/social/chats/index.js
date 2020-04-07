import PleaseSignIn from '../../../components/PleaseSignIn';
import ChatsListScreen from '../../../components/ChatsListScreen';

const MessagesPage = props => {
  const {
    appData: { currentUser },
  } = props;
  return (
    <div>
      <PleaseSignIn
        currentUser={currentUser}
        message="You must be signed in to view messages">
        <ChatsListScreen />
      </PleaseSignIn>
    </div>
  );
};

export default MessagesPage;
