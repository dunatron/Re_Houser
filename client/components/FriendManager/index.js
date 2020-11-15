import PropTypes from 'prop-types';
import React, { Suspense } from 'react';
import { useQuery } from '@apollo/client';
import PendingFriendRequests from './PendingFriendRequests';
import FriendsList from './FriendsList';
import { CURRENT_USER_QUERY } from '@/Gql/queries/index';
import UserSearch from '@/Components/UserSearch';

const FriendManager = props => {
  const { me } = props;
  return (
    <div>
      <h1>Friend Manager</h1>
      <PendingFriendRequests me={me} />
      <h4>Search for users and add as friends</h4>
      <UserSearch me={me} />
      <FriendsList me={me} />
    </div>
  );
};

FriendManager.propTypes = {
  me: PropTypes.any,
};

const FriendManagerWithSuspense = () => {
  const { data, error, loading } = useQuery(CURRENT_USER_QUERY, {});
  if (loading) return 'Loading user data';
  return <FriendManager me={data.me} />;
};
export default FriendManagerWithSuspense;
