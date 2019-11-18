// import { Query } from "react-apollo";
// import { CURRENT_USER_QUERY } from "../User/index";
// import Signin from "../Signin/index";
// import SuperLogin from "../SuperLogin";
// import { toast } from "react-toastify";

// const Message = ({ message, alert }) => {
//   if (alert) toast.info(alert);
//   if (message) return <p>{message}</p>;
//   return null;
//   return <p>Please Sign In before Continuing</p>;
// };

// const PleaseSignIn = props => (
//   <Query query={CURRENT_USER_QUERY}>
//     {({ data, loading }) => {
//       if (loading) return <p>Loading...</p>;
//       if (!data.me) {
//         return (
//           <div>
//             <Message message={props.message} alert={props.alert} />
//             {/* <Signin /> */}
//             <SuperLogin />
//           </div>
//         );
//       }
//       return props.children;
//     }}
//   </Query>
// );

// export default PleaseSignIn;

import { Query } from 'react-apollo';
import { CURRENT_USER_QUERY } from '../User/index';
import Signin from '../Signin/index';
import SuperLogin from '../SuperLogin';
import { toast } from 'react-toastify';
import Error from '../ErrorMessage';

const Message = ({ message, alert }) => {
  if (alert) toast.info(alert);
  if (message) return <p>{message}</p>;
  return null;
  return <p>Please Sign In before Continuing</p>;
};

const PleaseSignIn = props => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, loading, error }) => {
      if (loading) return <p>loading please sign in</p>;
      if (error) return <Error error={error} />;
      if (!data.me) {
        return (
          <div>
            <Message message={props.message} alert={props.alert} />
            <SuperLogin />
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
    }}
  </Query>
);

export default PleaseSignIn;
