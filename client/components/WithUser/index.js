import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Query, Mutation, Subscription } from '@apollo/react-components';
import { ApolloProvider, useQuery, useApolloClient } from '@apollo/client';
import { CURRENT_USER_QUERY } from '@/Components/User/index';
import { useCurrentUser } from '@/Components/User';
import Loader from '@/Components/Loader';

/**
 * Ok listen up chump, here is the architecture
 * - rename to WithData
 * - useCurrentUser
 * - useWhatever
 * loggedUser => {loading: loading, error: error}
 * to avoid Conflicts in local component props, wrap in appData: { me}
 */
const WithUser = props => {
  // const { data, error, loading } = useCurrentUser();
  // const currentUserProps = useCurrentUser();

  // if (currentUserProps.loading)
  //   return (
  //     <div
  //       style={{
  //         marginLeft: 'auto',
  //         marginRight: 'auto',
  //       }}>
  //       <Loader
  //         fullScreen
  //         loading={currentUserProps.loading}
  //         text="Loading user data: ToDo: Check for token. If there is none we can skip this"
  //       />
  //     </div>
  //   );

  // const children = React.Children.map(props.children, child => {
  //   if (React.isValidElement(child)) {
  //     return React.cloneElement(child, {
  //       appData: {
  //         currentUser: currentUserProps,
  //       },
  //     });
  //   }
  //   return child;
  // });
  // return children;
  const children = React.Children.map(props.children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        appData: {
          currentUser: { data: { me: null }, loading: false, error: null },
        },
      });
    }
    return child;
  });
  return children;
};

WithUser.propTypes = {
  children: PropTypes.any,
};

export default WithUser;
