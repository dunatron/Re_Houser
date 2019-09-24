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

import { Query } from "react-apollo"
import { CURRENT_USER_QUERY } from "../User/index"
import Signin from "../Signin/index"
import SuperLogin from "../SuperLogin"
import { toast } from "react-toastify"

const Message = ({ message, alert }) => {
  if (alert) toast.info(alert)
  if (message) return <p>{message}</p>
  return null
  return <p>Please Sign In before Continuing</p>
}

const PleaseSignIn = props => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, loading }) => {
      if (loading) return <p>Loading...</p>
      if (!data.me) {
        return (
          <div>
            <Message message={props.message} alert={props.alert} />
            <SuperLogin />
          </div>
        )
      }
      // https://medium.com/better-programming/passing-data-to-props-children-in-react-5399baea0356
      // share user data with children components as props.me
      const children = React.Children.map(props.children, child => {
        return React.cloneElement(child, {
          me: data.me,
        })
      })
      return children
    }}
  </Query>
)

export default PleaseSignIn
