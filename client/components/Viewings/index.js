import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { withStyles } from '@material-ui/core/styles';
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

import CreateViewing from './CreateViewing';
import DeleteViewing from './DeleteViewing';
import EditViewing from './EditViewing';

const styles = theme => ({
  root: {
    padding: theme.spacing(1),
  },
});

const Viewings = ({ where, me, propertyId, classes }) => {
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
      <CreateViewing propertyId={propertyId} me={me} where={where} />
      {data.viewings &&
        data.viewings.map((viewing, idx) => {
          return (
            <div>
              <RenderViewingByRecurringType viewing={viewing} me={me} />
              <Actions viewing={viewing} me={me} where={where} />
              <hr />
            </div>
          );
        })}
    </div>
  );
};

// only render actions if they are a host for this viewing or an admin
const Actions = ({ viewing, me, where }) => {
  const { hosts } = viewing;
  const _canView = () => {
    if (!me) return false;
    if (hosts.filter(host => host.id === me.id)) return true;
    if (me.permissions.includes('ADMIN')) return true;
    return false;
  };

  if (!_canView()) return null;

  return (
    <div>
      <EditViewing viewing={viewing} where={where} me={me} />
      <DeleteViewing viewing={viewing} where={where} />
    </div>
  );
};

// add actions to the viewing
const RenderViewingByRecurringType = ({ viewing, me, ...rest }) => {
  switch (viewing.recurringType) {
    case 'ONCE':
      return <OnceViewing viewing={viewing} {...rest} />;
    case 'DAILY':
      return <DailyViewing viewing={viewing} {...rest} />;
    case 'WEEKLY':
      return <WeeklyViewing viewing={viewing} {...rest} />;
    default:
      return null;
  }
};

RenderViewingByRecurringType.propTypes = {
  viewing: PropTypes.object,
};

export default withStyles(styles)(Viewings);
