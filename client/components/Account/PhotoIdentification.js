import PropTypes from 'prop-types';
import React from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_USER_MUTATION } from '@/Gql/mutations/index';
import { CURRENT_USER_QUERY } from '@/Gql/queries/index';
import { makeStyles } from '@material-ui/core/styles';
import FormCreator from '@/Components/Forms/FormCreator';

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
        onSubmit={data =>
          updateUser({
            variables: {
              data: {
                ...data,
              },
              where: {
                id: me.id,
              },
            },
            refetchQueries: refetchQueries,
          })
        }
        isNew={photoIdentification ? true : false}
        title="Photo Identification Form"
      />
    </div>
  );
};

PhotoIdentification.propTypes = {
  me: PropTypes.shape({
    id: PropTypes.any,
    identificationNumber: PropTypes.any,
    photoIdentification: PropTypes.object,
  }).isRequired,
};

export default PhotoIdentification;
