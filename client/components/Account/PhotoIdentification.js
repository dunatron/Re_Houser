import React from 'react';
import { useMutation } from '@apollo/react-hooks';
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

const PhotoIdentification = props => {
  const { me } = props;
  const { photoIdentification } = me;

  const [updateUserProfile, { loading, error, data }] = useMutation(
    UPDATE_USER_MUTATION
  );

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        flexDirection: 'column',
      }}>
      {photoIdentification && (
        <PhotoID>
          <div class="id__strip">
            <h2 class="id__number">
              Photo ID Number{' '}
              <span style={{ color: 'green' }}>{me.identificationNumber}</span>
              <TextField
                defaultValue={me.identificationNumber}
                onChange={e => {
                  console.log(e.target.value);
                  props.updateVariable('identificationNumber', e.target.value);
                }}
              />
            </h2>
            <IconButton
              aria-label="Edit"
              onClick={() =>
                props.updateVariable(
                  'identificationNumber',
                  me.identificationNumber
                )
              }>
              <EditIcon color="default" />
            </IconButton>
          </div>
          <Image src={photoIdentification.url} />
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
