import PropTypes from "prop-types";
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import TextInput from '../Inputs/TextInput';
import Button from '@material-ui/core/Button';
import FriendRequestButton from '../MutationButtons/FriendRequestButton';
import { CURRENT_USER_QUERY } from '../../graphql/queries/index';
import Error from '../ErrorMessage';

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
  me: PropTypes.any.isRequired
}

export default PendingFriendRequests;
