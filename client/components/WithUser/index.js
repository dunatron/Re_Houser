import React, { useEffect } from 'react';
import { Query, Mutation, Subscription } from '@apollo/react-components';
import { ApolloProvider, useQuery, useApolloClient } from '@apollo/client';
import { CURRENT_USER_QUERY } from '../User/index';
import { useCurrentUser } from '../User';
import Loader from '../Loader';

// const WithUser = props => {
//   return (
//     <Query query={CURRENT_USER_QUERY}>
//       {({ data, loading }) => {
//         // if (loading)
//         //   return (
//         //     <div>
//         //       Personalizing application
//         //       <Loader loading={loading} text="Fetching your data" />
//         //     </div>
//         //   );
//         const children = React.Children.map(props.children, child => {
//           if (React.isValidElement(child)) {
//             return React.cloneElement(child, {
//               me: data ? data.me : null,
//               loadingUser: loading,
//             });
//           }
//           return child;
//         });
//         return children;
//       }}
//     </Query>
//   );
// };

// export default WithUser;

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

  // useEffect(() => {
  //   console.log('Ohh useEffect loading triggered');
  // }, []);

  // if (loading) return 'Checking and loading credentials';

  const children = React.Children.map(props.children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        // me: data ? data.me : null,
        // loadingUser: loading,
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
