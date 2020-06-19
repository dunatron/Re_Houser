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
import FormCreator from '../Forms/FormCreator';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}));

const PHOTO_ID_FORM_CONF = [
  {
    type: 'Header',
    key: 'TheHeader',
    fieldProps: {
      label: 'Photo Id Form',
    },
  },
  {
    type: 'String',
    key: 'identificationNumber',
    fieldProps: {
      name: 'identificationNumber',
      label: 'Identification number',
    },
    refConf: {
      required: {
        value: true,
        message: 'You need the identifications id number',
      },
    },
  },
  {
    type: 'File',
    key: 'photoIdentification',
    fieldProps: {
      isMultiple: false,
      maxFilesAllowed: 1,
      name: 'photoIdentification',
      label: 'Photo Identification',
      description:
        'You need a file attached for identification such as a passport or drivers NZ drivers license',
    },
    refConf: {
      required: {
        value: true,
        message:
          'You need a file attached for identification such as a passport or drivers NZ drivers license',
      },
    },
  },
];

const PhotoIdentification = props => {
  const classes = useStyles();
  const { me } = props;
  const { photoIdentification } = me;

  'PhotoIdentification props => ', props;

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

  const formData = {
    photoIdentification: photoIdentification,
    identificationNumber: me.identificationNumber,
  };

  return (
    <div
      style={{
        maxWidth: '550px',
      }}>
      <FormCreator
        data={formData}
        config={PHOTO_ID_FORM_CONF}
        posting={loading}
        error={error}
        forceFormUpdates={true}
        updateCacheOnRemovedFile={(cache, result) => {
          updateUserProfile({
            variables: {
              data: {
                photoIdentification: {
                  disconnect: true,
                },
              },
            },
          });
        }}
        onSubmit={data => {
          updateUserProfile({
            variables: {
              data: {
                ...data,
              },
            },
            refetchQueries: [
              {
                query: CURRENT_USER_QUERY,
              },
            ],
          });
        }}
        isNew={photoIdentification ? true : false}
        title="Photo Identification Form"
      />
    </div>
  );
};

// const PhotoIdentification = props => {
//   const classes = useStyles();
//   const { me } = props;
//   const { photoIdentification } = me;

//   const [updateUserProfile, { loading, error, data }] = useMutation(
//     UPDATE_USER_MUTATION
//   );

//   return (
//     <div className={classes.root}>
//       {photoIdentification && (
//         <PhotoID>
//           <div className="id__strip">
//             <div className="id__number">
//               <TextField
//                 color="primary"
//                 label="PhotoId Number"
//                 fullWidth={true}
//                 defaultValue={me.identificationNumber}
//                 onChange={e =>
//                   props.updateVariable('identificationNumber', e.target.value)
//                 }
//               />
//             </div>
//           </div>
//           <Image
//             src={photoIdentification.url}
//             animationDuration={3000}
//             style={{ width: '100%' }}
//             imageStyle={{ width: '100%' }}
//           />
//         </PhotoID>
//       )}
//       <Error error={error} />
//       {loading && <p>Please wait...</p>}
//       <DragDropUploader
//         // disabled={loading}
//         style={{ padding: '40px' }}
//         disabled={loading}
//         externalLoading={loading}
//         dropStyles={{ padding: '40px', minWidth: '300px' }}
//         addText="DROP LEGAL PHOTO ID"
//         addBtnText="Or Click to Browse"
//         multiple={true}
//         types={['image']}
//         extensions={['.jpg', '.png']}
//         // receiveFile={file => this.setFileInState(file)}
//         // receiveFile={file => this._updateUserPhotoIdFile(file, updateUser)}
//         receiveFile={file =>
//           updateUserProfile({
//             variables: {
//               data: {},
//               photoFile: file.raw,
//             },
//             refetchQueries: [{ query: CURRENT_USER_QUERY }],
//           })
//         }
//       />
//       <Typography variant="body1">
//         Valid Photo ID includes the following, Drivers License, passport
//       </Typography>
//     </div>
//   );
// };

export default PhotoIdentification;
