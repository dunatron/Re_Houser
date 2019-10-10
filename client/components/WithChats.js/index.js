import { Query } from 'react-apollo';
import { CURRENT_USER_QUERY } from '../User/index';
import Loader from '../Loader';

// const WithChats = props => (
//   <Query query={CURRENT_USER_QUERY}>
//     {({ data, loading }) => {
//       if (loading)
//         return (
//           <div>
//             Personalizing application
//             <Loader loading={loading} text="Fetching your data" />
//           </div>
//         );
//       return props.children;
//     }}
//   </Query>
// );

const WithChats = props => {
  // if no user there are no chats to get so just return children
  //   if (!props.me) return props.children;
  console.log('WithCats props => ', props);
  // all with chats has to do is put them into the store.
  if (!props.me) {
    return (
      <div>
        <h1>Cool logged in WithCats now get them anbd put in store</h1>
        {props.children}
      </div>
    );
  }
  return (
    <div>
      <h1>
        I will simply load the chats in the background using async, then pass
        the chats somehow. Perhaps, when this is called it overwrites the chat
        in localStore
      </h1>
      {props.children}
    </div>
  );
};

export default WithChats;
