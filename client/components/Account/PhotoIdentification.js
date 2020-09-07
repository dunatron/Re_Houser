import React from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_USER_MUTATION } from '../../graphql/mutations/index';
import { CURRENT_USER_QUERY } from '../../graphql/queries/index';
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
      fileParams: {
        folder: 'test',
      },
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

  const [updateUser, { loading, error, data }] = useMutation(
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

  const refetchQueries = [
    {
      query: CURRENT_USER_QUERY,
    },
  ];

  return (
    <div
      style={{
        maxWidth: '550px',
      }}>
      <FormCreator
        folder={`users/${me.id}/photo-id`}
        data={formData}
        config={PHOTO_ID_FORM_CONF}
        posting={loading}
        error={error}
        forceFormUpdates={true}
        refetchQueries={refetchQueries}
        updateCacheOnRemovedFile={(cache, result) => {}}
        onSubmit={data => {
          console.log('DATA FOR UPDATE USER PHOTO ID => ', data);
          updateUser({
            variables: {
              data: {
                ...data,
              },
            },
            refetchQueries: refetchQueries,
          });
        }}
        isNew={photoIdentification ? true : false}
        title="Photo Identification Form"
      />
    </div>
  );
};

export default PhotoIdentification;
