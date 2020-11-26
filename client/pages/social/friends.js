import PropTypes from 'prop-types';
import FriendManager from '@/Components/FriendManager/index';
import PleaseSignIn from '@/Components/PleaseSignIn';

// server side props
import { initializeApollo, addApolloState } from '@/Lib/apolloClient';
import { CURRENT_USER_QUERY } from '@/Gql/queries';

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
