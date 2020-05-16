import React, { useState, useRef } from 'react';
import PleaseSignIn from '../../components/PleaseSignIn';
import Account from '../../components/Account/index';
import FileUploader from '../../components/FileUploader';

// export const Default = withMp3FileUpload(({ mutate }) => {
//   const [file, setFile] = useState(null);
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     if (!mutate || !file) {
//       return;
//     }
//     let abort;
//     mutate({
//       variables: {
//         file
//       },
//       context: {
//         fetchOptions: {
//           useUpload: true,
//           onProgress: (ev) => {
//             setProgress(ev.loaded / ev.total);
//           },
//           onAbortPossible: (abortHandler) => {
//             abort = abortHandler;
//           }
//         }
//       }
//     }).catch(err => console.log(err));

//     return () => {
//       if (abort) {
//         abort();
//       }
//     };
//   }, [file]);
// }

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
