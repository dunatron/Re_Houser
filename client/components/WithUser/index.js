import React, { useEffect } from 'react';
import { Query, Mutation, Subscription } from '@apollo/react-components';
import { ApolloProvider, useQuery, useApolloClient } from '@apollo/client';
import { CURRENT_USER_QUERY } from '../User/index';
import { useCurrentUser } from '../User';
import Loader from '../Loader';

/**
 * Ok listen up chump, here is the architecture
 * - rename to WithData
 * - useCurrentUser
 * - useWhatever
 * loggedUser => {loading: loading, error: error}
 * to avoid Conflicts in local component props, wrap in appData: { me}
 */
const WithUser = props => {
  const { data, error, loading } = useCurrentUser();
  const currentUserProps = useCurrentUser();

  console.log('WITH USER RENDER');

  if (loading)
    <Loader
      text="Loading User Data: ToDo: Check for token. If they dont have it we can skip this"
      loading={true}
      fullscreen={true}
    />;

  // if (loading)
  const children = React.Children.map(props.children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        appData: {
          currentUser: currentUserProps,
        },
      });
    }
    return child;
  });
  return children;
};

export default WithUser;
