import { useState } from 'react';
import { useMutation } from '@apollo/client';

import { toast } from 'react-toastify';
import { UPDATE_VIEWING_MUTATION } from '@/Gql/mutations';
import PropTypes from 'prop-types';
import mePropTypes from '../../propTypes/mePropTypes';

import ViewingForm from './ViewingForm';

import { Button } from '@material-ui/core';

const EditViewing = ({ viewing, where, me }) => {
  const [editing, setEditing] = useState(false);

  const handleCompleted = data => {
    toast(
      <div>
        <h1>Updated Viewing</h1>
      </div>
    );
    setEditing(false);
  };

  const handleError = error => {
    toast(
      <div>
        <h1>{error.message}</h1>
      </div>
    );
  };

  const [updateViewing, { loading, data, error }] = useMutation(
    UPDATE_VIEWING_MUTATION,
    {
      onCompleted: handleCompleted,
      onError: handleError,
    }
  );

  const handleUpdateViewing = data => {
    updateViewing({
      variables: {
        data: {
          ...data,
          hosts: {
            set: data.hosts ? data.hosts.map(host => ({ id: host.id })) : [], // probs not this btw
          },
        },
        where: {
          id: viewing.id,
        },
      },
    });
  };

  if (!editing)
    return (
      <Button color="primary" onClick={() => setEditing(true)}>
        EDIT VIEWING
      </Button>
    );
  return (
    <div>
      <ViewingForm
        loading={loading}
        viewing={viewing}
        cancel={() => setEditing(false)}
        me={me}
        onSave={handleUpdateViewing}
      />
    </div>
  );
};

EditViewing.propTypes = {
  viewing: PropTypes.shape({
    id: PropTypes.string.isRequired,
    recurringType: PropTypes.string.isRequired,
  }),
  where: PropTypes.object,
  me: mePropTypes,
};

export default EditViewing;
