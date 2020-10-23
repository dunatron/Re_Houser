import PropTypes from 'prop-types';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_USER_MUTATION } from '@/Gql/mutations';

import { CURRENT_USER_QUERY } from '@/Gql/queries/index';
import { makeStyles } from '@material-ui/core/styles';
import FileUploader from '@/Components/FileUploader';

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

  const [updateUser, { loading, error, data }] = useMutation(
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
        fileParams={{
          folder: `users/${me.id}/profile-photo`,
          type: 'upload',
          resource_type: 'image',
        }}
        title="Upload Profile photo"
        maxFilesAllowed={1}
        files={me.profilePhoto ? [me.profilePhoto] : []}
        refetchQueries={refetchQueries}
        updateCacheOnRemovedFile={(cache, result) => {
          updateUser({
            variables: {
              data: {
                profilePhoto: {
                  disconnect: true,
                },
              },
              where: {
                id: me.id,
              },
            },
          });
        }}
        recieveFile={file => {
          updateUser({
            variables: {
              data: {
                profilePhoto: {
                  connect: {
                    id: file.id,
                  },
                },
              },
              where: {
                id: me.id,
              },
            },
          });
        }}
      />
    </div>
  );
};

UploadProfilePhoto.propTypes = {
  me: PropTypes.shape({
    id: PropTypes.any,
    profilePhoto: PropTypes.shape({
      url: PropTypes.any,
    }),
  }).isRequired,
};

export default UploadProfilePhoto;
