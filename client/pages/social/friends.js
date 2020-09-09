import PropTypes from 'prop-types';
import FriendManager from '../../components/FriendManager/index';
import PleaseSignIn from '../../components/PleaseSignIn';

const SocialFriendsePage = ({ appData: { currentUser } }) => {
  return (
    <div>
      <PleaseSignIn
        currentUser={currentUser}
        message="You must be signed in to manager your friends">
        <FriendManager />
      </PleaseSignIn>
    </div>
  );
};

SocialFriendsePage.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object.isRequired,
  }),
};

export default SocialFriendsePage;
