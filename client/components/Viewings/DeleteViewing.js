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

const DeleteViewing = ({ viewing, where }) => {
  const [deleteViewing, { loading, error, data }] = useMutation(
    DELETE_VIEWING,
    {
      variables: {
        where: {
          id: viewing.id,
        },
      },
      refetchQueries: [
        {
          query: VIEWINGS_QUERY,
          variables: {
            where: { ...where },
          },
        },
      ],
    }
  );
  return (
    <Button onClick={deleteViewing} disabled={loading} color="secondary">
      DELETE VIEWING
    </Button>
  );
};

export default DeleteViewing;
