import { useQuery } from '@apollo/client';
import { withStyles } from '@material-ui/core/styles';
import { VIEWINGS_QUERY } from '@/Gql/queries';

import PropTypes from 'prop-types';

import Loading from '@/Components/Loader';
import Error from '@/Components/ErrorMessage';
import Card from '@/Styles/Card';

import RenderViewingByRecurringType from './RenderViewingByRecurringType';

import CreateViewing from './CreateViewing';
import Actions from './Actions';
import RequestViewing from './RequestViewing';

// proptypes
import mePropTypes from '../../propTypes/mePropTypes';
import { Typography } from '@material-ui/core';

const styles = theme => ({
  root: {
    padding: theme.spacing(1),
  },
});

const Viewings = ({ where, me, propertyId, classes, disableCreate }) => {
  const { loading, error, data } = useQuery(VIEWINGS_QUERY, {
    variables: {
      where: { ...where },
    },
  });

  if (loading)
    return (
      <Loading
        loading={loading}
        text={`Fetching viewings for ${JSON.stringify(where)}`}
      />
    );

  if (error) return <Error error={error} />;

  return (
    <div className={classes.root}>
      {!disableCreate && (
        <CreateViewing propertyId={propertyId} me={me} where={where} />
      )}
      {data.viewings.length === 0 && (
        <div>
          <Typography>There are no viewings currently</Typography>
          <RequestViewing />
        </div>
      )}
      {data.viewings &&
        data.viewings.map(viewing => (
          <div key={viewing.id}>
            <RenderViewingByRecurringType viewing={viewing} me={me} />
            <Actions viewing={viewing} me={me} where={where} />
          </div>
        ))}
    </div>
  );
};

// add actions to the viewing

Viewings.propTypes = {
  where: PropTypes.object.isRequired,
  me: mePropTypes,
  propertyId: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Viewings);
