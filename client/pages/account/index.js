import React, { Component } from 'react';
import PleaseSignIn from '../../components/PleaseSignIn';
import Account from '../../components/Account/index';

const AccountPage = props => {
  const {
    appData: { currentUser },
  } = props;
  return (
    <PleaseSignIn
      currentUser={currentUser}
      alert={
        <div>
          <p>
            <strong>Please Sign In</strong>
          </p>
          <p>You must be signed in to view your account</p>
        </div>
      }>
      <Account />
    </PleaseSignIn>
  );
};

export default AccountPage;

// export default class AccountPage extends Component {
//   render() {
//     return (
//       <div>
//         <PleaseSignIn
//           me={props.me}
//           alert={
//             <div>
//               <p>
//                 <strong>Please Sign In</strong>
//               </p>
//               <p>You must be signed in to view your account</p>
//             </div>
//           }>
//           <Account />
//         </PleaseSignIn>
//       </div>
//     );
//   }
// }
