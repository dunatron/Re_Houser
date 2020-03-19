import React from 'react';
import { useMutation } from '@apollo/client';
import DragDropUploader from '../DragDropUploader/index';
import { UPDATE_USER_MUTATION } from '../../graphql/mutations/index';
import { CURRENT_USER_QUERY } from '../../graphql/queries/index';
import Error from '../ErrorMessage/index';
import { IconButton, Typography, TextField } from '@material-ui/core';
import Image from 'material-ui-image';
// styles
import PhotoID from '../../styles/PhotoID';
// Icons
import EditIcon from '../../styles/icons/EditIcon';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}));

const PhotoIdentification = props => {
  const classes = useStyles();
  const { me } = props;
  const { photoIdentification } = me;

  const [updateUserProfile, { loading, error, data }] = useMutation(
    UPDATE_USER_MUTATION
  );

  return (
    <div className={classes.root}>
      {photoIdentification && (
        <PhotoID>
          <div class="id__strip">
            <div class="id__number">
              <TextField
                color="primary"
                label="PhotoId Number"
                fullWidth={true}
                defaultValue={me.identificationNumber}
                onChange={e => props.updateVariable('identificationNumber', e.target.value);}
              />
            </div>
          </div>
          <Image
            src={photoIdentification.url}
            animationDuration={3000}
            style={{ width: '100%' }}
            imageStyle={{ width: '100%' }}
          />
        </PhotoID>
      )}
      <Error error={error} />
      {loading && <p>Please wait...</p>}
      <DragDropUploader
        // disabled={loading}
        style={{ padding: '40px' }}
        disabled={loading}
        externalLoading={loading}
        dropStyles={{ padding: '40px', minWidth: '300px' }}
        addText="DROP LEGAL PHOTO ID"
        addBtnText="Or Click to Browse"
        multiple={true}
        types={['image']}
        extensions={['.jpg', '.png']}
        // receiveFile={file => this.setFileInState(file)}
        // receiveFile={file => this._updateUserPhotoIdFile(file, updateUser)}
        receiveFile={file =>
          updateUserProfile({
            variables: {
              data: {},
              photoFile: file.raw,
            },
            refetchQueries: [{ query: CURRENT_USER_QUERY }],
          })
        }
      />
      <Typography variant="body1">
        Valid Photo ID includes the following, Drivers License, passport
      </Typography>
    </div>
  );
};

export default PhotoIdentification;
