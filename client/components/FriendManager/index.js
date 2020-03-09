import React, { Suspense } from 'react';
import { useQuery } from '@apollo/client';
import SearchAndRequestFriend from './SearchAndRequestFriend';
import PendingFriendRequests from './PendingFriendRequests';
import FriendsList from './FriendsList';
import { CURRENT_USER_QUERY } from '../../graphql/queries/index';

const FriendManager = props => {
  const { me } = props;
  return (
    <div>
      <h1>Friend Manager</h1>
      <PendingFriendRequests me={me} />
      <h4>Search for users and add as friends</h4>
      <SearchAndRequestFriend me={me} />
      <FriendsList me={me} />
    </div>
  );
};

const FriendManagerWithSuspense = () => {
  const { data, error, loading } = useQuery(CURRENT_USER_QUERY, {
    suspend: true,
  });
  if (loading) return 'Loading user data';
  return (
    <Suspense fallback={<div>Suspense</div>}>
      <FriendManager me={data.me} />
    </Suspense>
  );
};
export default FriendManagerWithSuspense;
