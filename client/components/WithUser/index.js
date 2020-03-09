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

const WithUser = props => {
  const { data, error, loading } = useCurrentUser();
  const children = React.Children.map(props.children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        me: data ? data.me : null,
        loadingUser: loading,
      });
    }
    return child;
  });
  return children;
};

export default WithUser;
