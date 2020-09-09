import { useMutation } from '@apollo/client';
import { DELETE_VIEWING } from '../../graphql/mutations';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

/**
 * APollo client 3.0 stable is here
 * test cache.gc() ie we are deleting this viewing ideally the cache knows that this object is no longer reachable...
 * also for onCreate and onUpdate lets try the best methods to add and update with minimal code... can we have policies for this...
 * cache.evict({ id: 'my-object-id' })
 */
const DeleteViewing = ({ viewing }) => {
  const [deleteViewing, { loading }] = useMutation(DELETE_VIEWING, {
    variables: {
      where: {
        id: viewing.id,
      },
    },

    update(
      cache,
      {
        data: { deleteViewing },
      }
    ) {
      const idToRemove = deleteViewing.id;
      cache.modify({
        // id: cache.identify(deleteViewing), // so do this made it like not work...
        fields: {
          viewings(existingViewingsRefs, { readField }) {
            return existingViewingsRefs.filter(
              viewingRef => idToRemove !== readField('id', viewingRef)
            );
          },
        },
      });
    },
  });
  return (
    <Button onClick={deleteViewing} disabled={loading} color="secondary">
      DELETE VIEWING
    </Button>
  );
};

DeleteViewing.propTypes = {
  viewing: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
};

export default DeleteViewing;
