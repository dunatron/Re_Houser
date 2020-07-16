import gql from 'graphql-tag';
import { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
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

const styles = theme => ({
  root: {},
  createBtn: {
    marginBottom: theme.spacing(2),
  },
});

const CreateViewing = ({ propertyId, me, where, classes }) => {
  // they need to be an admin or one of the owners on the property
  const [isCreating, setIsCreating] = useState(false);

  const handleCompleted = data => {
    toast(
      <div>
        <h1>New Viewing created</h1>
      </div>
    );
    setIsCreating(false);
  };

  const handleError = error => {
    toast(
      <div>
        <h1>{error.message}</h1>
      </div>
    );
  };

  const [createViewing, { loading, error, data }] = useMutation(
    CREATE_VIEWING_MUTATION,
    {
      onCompleted: handleCompleted,
      onError: handleError,
      // not seeming to work
      // optimisticResponse: {
      //   __typename: 'Mutation',
      //   createViewing: {
      //     __typename: 'Viewing',
      //     id: 'testid',
      //     recurringType: 'ONCE',
      //     // dateTime: data.dateTime,
      //     // minutesFor: data.minutesFor,
      //     // ...data, // spreading this data probs wont work due to whats on it
      //   },
      // },
      update(cache, { data: { createViewing } }) {
        cache.modify({
          fields: {
            viewings(existingViewingRefs = [], { readField }) {
              const newViewingRef = cache.writeFragment({
                data: createViewing,
                fragment: gql`
                  fragment NewViewing on Viewing {
                    id
                  }
                `,
              });
              return [...existingViewingRefs, newViewingRef];
            },
          },
        });
      },
    }
  );

  const handleCreateViewing = data => {
    createViewing({
      variables: {
        data: {
          dateTime: data.dateTime,
          recurringType: data.recurringType,
          minutesFor: data.minutesFor,
          property: {
            connect: {
              id: propertyId,
            },
          },
          hosts: {
            connect: data.hosts.map(host => ({ id: host.id })),
          },
        },
      },
      // not seeming to work
      // optimisticResponse: {
      //   __typename: 'Mutation',
      //   createViewing: {
      //     __typename: 'Viewing',
      //     id: 'testid',
      //     recurringType: 'ONCE',
      //     dateTime: data.dateTime,
      //     minutesFor: data.minutesFor,
      //     // ...data, // spreading this data probs wont work due to whats on it
      //   },
      // },
      // refetchQueries: [
      //   {
      //     query: VIEWINGS_QUERY,
      //     variables: {
      //       where: { ...where },
      //     },
      //   },
      // ],
    });
  };
  return (
    <div className={classes.root}>
      {/* {!isCreating ? (
        <Button onClick={() => setIsCreating(true)}>Add Viewing</Button>
      ) : (
        <Button onClick={() => setIsCreating(false)}>Cancel add viewing</Button>
      )} */}

      {!isCreating && (
        <Button
          className={classes.createBtn}
          onClick={() => setIsCreating(true)}
          color="primary">
          Add Viewing
        </Button>
      )}

      {isCreating && (
        <ViewingForm
          loading={loading}
          cancel={() => setIsCreating(false)}
          me={me}
          onSave={handleCreateViewing}
        />
      )}
    </div>
  );
};

export default withStyles(styles)(CreateViewing);
