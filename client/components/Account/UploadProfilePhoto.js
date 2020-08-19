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

  const refetchQueries = [
    {
      query: CURRENT_USER_QUERY,
    },
  ];

  const [updateUserProfile, { loading, error, data }] = useMutation(
    UPDATE_USER_MUTATION,
    {
      refetchQueries: refetchQueries,
    }
  );
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
        refetchQueries={refetchQueries}
        updateCacheOnRemovedFile={(cache, result) => {
          updateUserProfile({
            variables: {
              data: {
                profilePhoto: {
                  disconnect: true,
                },
              },
            },
          });
        }}
        recieveFile={file => {
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
