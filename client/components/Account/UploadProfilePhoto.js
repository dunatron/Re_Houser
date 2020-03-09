import DragDropUploader from '../DragDropUploader/index';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPLOAD_PROFILE_PHOTO } from '../../graphql/mutations';
import { CURRENT_USER_QUERY } from '../../graphql/queries/index';
import Image from 'material-ui-image';

import { makeStyles } from '@material-ui/core/styles';

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
  const [uploadImage, uploadImageProps] = useMutation(UPLOAD_PROFILE_PHOTO);
  // console.log('uploadImageProps => ', uploadImageProps);

  return (
    <div className={classes.root}>
      {imageUrl && (
        <div className={classes.profilePhoto}>
          <Image
            src={imageUrl}
            style={{ width: '100%' }}
            imageStyle={{ width: '100%' }}
          />
        </div>
      )}
      <DragDropUploader
        // disabled={loading}
        style={{ padding: '40px' }}
        // disabled={loading}
        // externalLoading={loading}
        dropStyles={{ padding: '40px', minWidth: '300px' }}
        addText="DROP PROFILE PHOTO"
        addBtnText="Or Click to Browse"
        multiple={true}
        types={['image']}
        extensions={['.jpg', '.png']}
        // receiveFile={file => _updateUserPhotoIdFile(file)}
        receiveFile={file =>
          uploadImage({
            variables: {
              file: file.raw,
            },
            refetchQueries: [{ query: CURRENT_USER_QUERY }],
            update: (proxy, { data }) => {
              setImageUrl(data.uploadProfilePhoto.profilePhoto.url);
            },
          })
        }
      />
    </div>
  );
};

export default UploadProfilePhoto;
