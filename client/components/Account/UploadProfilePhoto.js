import DragDropUploader from '../DragDropUploader/index';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  UPLOAD_PROFILE_PHOTO,
  UPDATE_USER_MUTATION,
} from '../../graphql/mutations';

import { CURRENT_USER_QUERY } from '../../graphql/queries/index';
import Image from 'material-ui-image';
import { makeStyles } from '@material-ui/core/styles';
import FileUploader from '../FileUploader';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  profilePhoto: {
    maxWidth: '280px',
  },
}));

const UploadProfilePhoto = ({ me }) => {
  const classes = useStyles();
  const [imageUrl, setImageUrl] = useState(
    me.profilePhoto ? me.profilePhoto.url : null
  );
  // const [uploadImage, uploadImageProps] = useMutation(UPLOAD_PROFILE_PHOTO);
  const [updateUserProfile, { loading, error, data }] = useMutation(
    UPDATE_USER_MUTATION,
    {
      refetchQueries: [
        {
          query: CURRENT_USER_QUERY,
        },
      ],
    }
  );
  // title,
  // description,
  // files,
  // maxFilesAllowed,
  // recieveFile,
  // removeFile,
  // fileRemovedFromServer,
  // refetchQueries,
  // updateCacheOnRemovedFile,
  return (
    <div
      className={classes.root}
      style={{
        maxWidth: '550px',
      }}>
      <FileUploader
        title="Upload Profile photo"
        maxFilesAllowed={1}
        files={me.profilePhoto ? [me.profilePhoto] : []}
        updateCacheOnRemovedFile={(cache, result) => {
          // update: {
          //   proofOfAddress: {
          //     disconnect: true,
          //   },
          // },

          updateUserProfile({
            variables: {
              data: {
                profilePhoto: {
                  disconnect: true,
                },
                // update: {
                //   profilePhoto: {
                //     disconnect: true,
                //   },
                // },
              },
            },
          });
        }}
        recieveFile={file => {
          console.log('Recieved profile photo => ', file);
          updateUserProfile({
            variables: {
              data: {
                profilePhoto: {
                  connect: {
                    id: file.id,
                  },
                },
              },
            },
          });
        }}
      />
    </div>
  );
};

export default UploadProfilePhoto;

// const UploadProfilePhoto = ({ me }) => {
//   const classes = useStyles();
//   const [imageUrl, setImageUrl] = useState(
//     me.profilePhoto ? me.profilePhoto.url : null
//   );
//   const [uploadImage, uploadImageProps] = useMutation(UPLOAD_PROFILE_PHOTO);

//   return (
//     <div className={classes.root}>
//       {imageUrl && (
//         <div className={classes.profilePhoto}>
//           <Image
//             src={imageUrl}
//             style={{ width: '100%' }}
//             imageStyle={{ width: '100%' }}
//           />
//         </div>
//       )}
//       <DragDropUploader
//         style={{ padding: '40px' }}
//         dropStyles={{ padding: '40px', minWidth: '300px' }}
//         addText="DROP PROFILE PHOTO"
//         addBtnText="Or Click to Browse"
//         multiple={true}
//         types={['image']}
//         extensions={['.jpg', '.png']}
//         receiveFile={file =>
//           uploadImage({
//             variables: {
//               file: file.raw,
//             },
//             refetchQueries: [{ query: CURRENT_USER_QUERY }],
//             update: (proxy, { data }) => {
//               setImageUrl(data.uploadProfilePhoto.profilePhoto.url);
//             },
//           })
//         }
//       />
//     </div>
//   );
// };

// export default UploadProfilePhoto;
