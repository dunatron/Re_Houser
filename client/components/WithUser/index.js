import { Query } from 'react-apollo';
import { CURRENT_USER_QUERY } from '../User/index';
import Loader from '../Loader';

const WithUser = props => {
  return (
    <Query query={CURRENT_USER_QUERY}>
      {({ data, loading }) => {
        if (loading)
          return (
            <div>
              Personalizing application
              <Loader loading={loading} text="Fetching your data" />
            </div>
          );
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
};

// const PleaseSignIn = props => (
//   <Query query={CURRENT_USER_QUERY}>
//     {({ data, loading, error }) => {
//       if (loading) return <p>Loading...</p>;
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

export default WithUser;
