import PropTypes from 'prop-types';
import PleaseSignIn from '../../../components/PleaseSignIn';
import ChatsListScreen from '../../../components/ChatsListScreen';

const SocialChatsPage = ({ appData: { currentUser } }) => {
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

SocialChatsPage.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object.isRequired,
  }),
};

export default SocialChatsPage;
