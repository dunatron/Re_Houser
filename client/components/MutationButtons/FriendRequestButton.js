import PropTypes from 'prop-types';
import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/client';
import Error from '@/Components/ErrorMessage';
import { Button, IconButton } from '@material-ui/core';
import { toast } from 'react-toastify';

import PersonAddIcon from '@material-ui/icons/PersonAdd';

const CREATE_FRIEND_REQUEST_MUTATION = gql`
  mutation CREATE_FRIEND_REQUEST_MUTATION($data: FriendRequestCreateInput!) {
    createFriendRequest(data: $data) {
      id
      requestUser {
        id
      }
      acceptingUser {
        id
        firstName
        lastName
        email
      }
    }
  }
`;
const FriendRequestButton = ({ requestFriendId, me }) => {
  const [createFriendRequest, createFriendRequestProps] = useMutation(
    CREATE_FRIEND_REQUEST_MUTATION,
    {
      variables: {
        data: {
          requestUser: {
            connect: {
              id: 'Determined On Server',
            },
          },
          acceptingUser: {
            connect: {
              id: requestFriendId,
            },
          },
        },
      },
      update: (proxy, payload) => {
        if (payload.data.createFriendRequest) {
          const { acceptingUser } = payload.data.createFriendRequest;
          toast.info(
            <div>
              <p>
                Friend request sent to {acceptingUser.firstName}{' '}
                {acceptingUser.lastName} @ {acceptingUser.email}
              </p>
            </div>
          );
        }
      },
    }
  );

  // const { friends, friendRequests, awaitingFriends } = me;
  // const awaitingFriendIds = awaitingFriends.map(v => v.acceptingUser.id);
  // const friendIds = friends.map(friend => friend.id);
  // // 1. check if they are already friends
  // if (friendIds.includes(requestFriendId)) {
  //   return 'You are already friends with this user';
  // }
  // // 2. check if they are already awaiting approval
  // if (awaitingFriendIds.includes(requestFriendId)) {
  //   return 'friend request sent awaiting user response';
  // }
  // // make sure its not them
  // if (requestFriendId === me.id) {
  //   return 'Cant be friends with yourself';
  // }
  return (
    <>
      <Error error={createFriendRequestProps.error} />
      <IconButton
        disabled={createFriendRequestProps.loading}
        onClick={() => createFriendRequest()}>
        <PersonAddIcon />
      </IconButton>
      {/* <Button
        variant="contained"
        disabled={createFriendRequestProps.loading}
        onClick={() => createFriendRequest()}>
        Send Friend request
      </Button> */}
    </>
  );
};

FriendRequestButton.propTypes = {
  me: PropTypes.any.isRequired,
  requestFriendId: PropTypes.any.isRequired
};

export default FriendRequestButton;
