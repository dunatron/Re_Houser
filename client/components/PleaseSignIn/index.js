import React, { useState } from 'react';
import { Query, Mutation, Subscription } from '@apollo/react-components';
import { ApolloProvider, useQuery, useApolloClient } from '@apollo/client';
import { CURRENT_USER_QUERY } from '../User/index';
import Signin from '../Signin/index';
import OpenSuperLoginButton from '../SuperLogin/OpenSuperLoginButton';
import { toast } from 'react-toastify';
import Error from '../ErrorMessage';
import { useCurrentUser } from '../User';
import Loader from '../Loader/index';

const Message = ({ message, alert }) => {
  const [alertCount, setAlertCount] = useState(0);
  // only fire alerts once per mount
  if (alertCount <= 0) {
    if (alert) toast.info(alert);
    if (message) return <p>{message}</p>;
    setAlertCount(alertCount + 1);
  }
  return null;
  return <p>Please Sign In before Continuing</p>;
};

// const PleaseSignIn = props => (
//   <Query query={CURRENT_USER_QUERY}>
//     {({ data, loading, error }) => {
//       if (loading) return <p>loading please sign in</p>;
//       if (error) return <Error error={error} />;
//       if (!data.me) {
//         return (
//           <div>
//             <Message message={props.message} alert={props.alert} />
//             <SuperLogin />
//           </div>
//         );
//       }
//       const children = React.Children.map(props.children, child => {
//         if (React.isValidElement(child)) {
//           return React.cloneElement(child, {
//             me: data.me,
//           });
//         }
//         return child;
//       });
//       return children;
//     }}
//   </Query>
// );

// const PleaseSignIn = props => {
//   const { data, error, loading } = useCurrentUser();
//   if (loading) return <p>loading please sign in</p>;
//   if (error) return <Error error={error} />;
//   if (!data.me) {
//     return (
//       <div>
//         <Message message={props.message} alert={props.alert} />
//         <SuperLogin />
//       </div>
//     );
//   }
//   const children = React.Children.map(props.children, child => {
//     if (React.isValidElement(child)) {
//       return React.cloneElement(child, {
//         me: data.me,
//       });
//     }
//     return child;
//   });
//   return children;
// };

// const PleaseSignIn = props => {
//   const { data, error, loading } = useCurrentUser();
//   if (loading) return <p>loading please sign in</p>;
//   if (error) return <Error error={error} />;
//   return 'Well this is kinda messy';
//   if (!data.me) {
//     return (
//       <div>
//         <Message message={props.message} alert={props.alert} />
//         <SuperLogin />
//       </div>
//     );
//   }
// const children = React.Children.map(props.children, child => {
//   if (React.isValidElement(child)) {
//     return React.cloneElement(child, {
//       me: data.me,
//     });
//   }
//   return child;
// });
//   return children;
// };

/**
 * The WithUser is giving every page it's me variable
 * use this
 */
const PleaseSignIn = props => {
  const { currentUser } = props;
  const { error, loading, data } = currentUser;

  if (loading) return <Loader loading={loading} text="Loading user settings" />;
  if (error) return <Error error={error} />;
  if (!data)
    return (
      <div>
        <Message message={props.message} alert={props.alert} />
        <OpenSuperLoginButton />
      </div>
    );
  if (!data.me) {
    return (
      <div>
        <Message message={props.message} alert={props.alert} />
        <OpenSuperLoginButton />
      </div>
    );
  }
  const children = React.Children.map(props.children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        me: data.me,
      });
    }
    return child;
  });
  return children;
};

export default PleaseSignIn;
