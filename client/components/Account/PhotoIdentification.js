import React, { Component } from 'react';
import DragDropUploader from '../DragDropUploader/index';
import { Mutation } from 'react-apollo';
import { UPDATE_USER_MUTATION } from '../../graphql/mutations/index';
import { CURRENT_USER_QUERY } from '../../graphql/queries/index';
import Error from '../ErrorMessage/index';
import IconButton from '@material-ui/core/IconButton';
// styles
import PhotoID from '../../styles/PhotoID';
// Icons
import EditIcon from '../../styles/icons/EditIcon';

export default class PhotoIdentification extends Component {
  _updateUserPhotoIdFile = async (file, updateUser) => {
    const res = await updateUser({
      variables: {
        data: {},
        photoFile: file.raw,
      },
    });
  };
  render() {
    const { me } = this.props;
    const { photoIdentification } = me;
    return (
      <div
        style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Mutation
          mutation={UPDATE_USER_MUTATION}
          // variables={this._variables()}
          refetchQueries={[{ query: CURRENT_USER_QUERY }]}
          update={this.update}>
          {(updateUser, { error, loading }) => (
            <>
              {photoIdentification && (
                <PhotoID>
                  <div class="id__strip">
                    <h2 class="id__number">
                      Photo ID Number{' '}
                      <span style={{ color: 'green' }}>
                        {me.identificationNumber}
                      </span>
                    </h2>
                    <IconButton
                      aria-label="Edit"
                      onClick={() =>
                        this.props.updateVariable(
                          'identificationNumber',
                          me.identificationNumber
                        )
                      }>
                      <EditIcon color="default" />
                    </IconButton>
                  </div>

                  <img src={photoIdentification.url} />
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
                addText="Drop Photo Identification"
                addBtnText="Or Click to Browse"
                multiple={true}
                types={['image']}
                extensions={['.jpg', '.png']}
                // receiveFile={file => this.setFileInState(file)}
                receiveFile={file =>
                  this._updateUserPhotoIdFile(file, updateUser)
                }
              />
            </>
          )}
        </Mutation>
      </div>
    );
  }
}
