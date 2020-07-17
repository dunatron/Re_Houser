import gql from 'graphql-tag';
import { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { CREATE_VIEWING_MUTATION } from '../../graphql/mutations';
import ViewingForm from './ViewingForm';
import { Button } from '@material-ui/core';

const styles = theme => ({
  root: {},
  createBtn: {
    marginBottom: theme.spacing(2),
  },
});

const CreateViewing = ({ propertyId, me, where, classes }) => {
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
    });
  };
  return (
    <div className={classes.root}>
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
