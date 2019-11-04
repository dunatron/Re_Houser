import DragDropUploader from '../DragDropUploader/index';
import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { UPLOAD_PROFILE_PHOTO } from '../../graphql/mutations';

const UploadProfilePhoto = ({ me }) => {
  const [imageUrl, setImageUrl] = useState(
    me.profilePhoto ? me.profilePhoto.url : null
  );
  const [uploadImage, uploadImageProps] = useMutation(UPLOAD_PROFILE_PHOTO);
  // console.log('uploadImageProps => ', uploadImageProps);

  return (
    <div>
      <h1>UploadProfilePhoto</h1>
      {imageUrl && <img src={imageUrl} />}
      <DragDropUploader
        // disabled={loading}
        style={{ padding: '40px' }}
        // disabled={loading}
        // externalLoading={loading}
        dropStyles={{ padding: '40px', minWidth: '300px' }}
        addText="Drop Photo Identification"
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
