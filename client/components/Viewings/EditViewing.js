import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { VIEWINGS_QUERY } from '../../graphql/queries';
import { toast } from 'react-toastify';
import {
  DELETE_VIEWING,
  UPDATE_VIEWING_MUTATION,
  CREATE_VIEWING_MUTATION,
} from '../../graphql/mutations';
import PropTypes from 'prop-types';

import Loading from '../Loader';
import Error from '../ErrorMessage';

// types
import OnceViewing from './types/Once';
import DailyViewing from './types/Daily';
import WeeklyViewing from './types/Weekly';

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

export default EditViewing;
