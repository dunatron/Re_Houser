import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from '@/Gql/queries/index';
import Error from '@/Components/ErrorMessage';

const ACCEPT_FRIEND_REQUEST_MUTATION = gql`
  mutation ACCEPT_FRIEND_REQUEST_MUTATION($friendRequestId: ID!) {
    acceptFriendRequest(friendRequestId: $friendRequestId) {
      message
      data
    }
  }
`;
const PendingFriendRequests = props => {
  const { me } = props;
  const { friendRequests } = me;
  const [acceptFriendRequest, acceptFriendRequestProps] = useMutation(
    ACCEPT_FRIEND_REQUEST_MUTATION
  );
  // dont actualyy do update, refetch the me query. I bet It will break if you updat ethe me query through cache
  const _doUpdate = (proxy, payload) => {};
  return (
    <div>
      <Error error={acceptFriendRequestProps.error} />
      {friendRequests.map((friendRequest, i) => {
        return (
          <div key={i}>
            <p>Friend request from {friendRequest.requestUser.firstName}</p>
            <button
              onClick={() =>
                acceptFriendRequest({
                  variables: {
                    friendRequestId: friendRequest.id,
                  },
                  update: (proxy, payload) => _doUpdate(proxy, payload),
                  refetchQueries: [
                    {
                      query: CURRENT_USER_QUERY,
                    },
                  ],
                })
              }>
              Accept friend Request
            </button>
          </div>
        );
      })}
    </div>
  );
};

PendingFriendRequests.propTypes = {
  me: PropTypes.any
};

export default PendingFriendRequests;
