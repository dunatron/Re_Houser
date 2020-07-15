// i will get a list of viewings attached to the property
// i will also need to displayh like a calendar or something that will show when viewings are
// lol fuck I almost have to repeat that fucken server logic since the actual dates will be out of wack
import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { VIEWINGS_QUERY } from '../../graphql/queries';
import { DELETE_VIEWING } from '../../graphql/mutations';
import PropTypes from 'prop-types';

import Loading from '../Loader';
import Error from '../ErrorMessage';

// types
import OnceViewing from './types/Once';
import DailyViewing from './types/Daily';
import WeeklyViewing from './types/Weekly';

import CreateViewing from './CreateViewing';
import ViewingForm from './ViewingForm';

import { Button } from '@material-ui/core';

const Viewings = ({ where, me, propertyId }) => {
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

  console.log('Viewings Data => ', data);

  // Next Once
  // Next 7 Dailys
  // Next 4 Weeklys

  return (
    <div>
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
          return <RenderViewingByRecurringType viewing={viewing} me={me} />;
          return (
            <div>
              <div>ID: {viewing.id}</div>
              <div>Property {viewing.property.location}</div>
              <div>Type: {viewing.recurringType}</div>
              <div>minutesFor: {viewing.minutesfor}</div>
              <div>notes {viewing.notes}</div>
              <div>onRequest {viewing.recurringType ? 'YES' : 'NO'}</div>
              <div>dateTime {viewing.dateTime}</div>
              <div>
                Hosts:
                {viewing.hosts && (
                  <ul>
                    {viewing.hosts.map((host, hIdx) => {
                      return <li>{host.firstName}</li>;
                    })}
                  </ul>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
};

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

const EditViewing = ({ viewing, where, me }) => {
  const [editing, setEditing] = useState(false);
  if (!editing)
    return (
      <Button color="primary" onClick={() => setEditing(true)}>
        EDIT VIEWING
      </Button>
    );
  return (
    <div>
      <ViewingForm
        viewing={viewing}
        cancel={() => setEditing(false)}
        me={me}
        onSave={() => alert('HOC SAVE VIEWING FORM')}
      />
    </div>
  );
};

// only render actions if they are a host for this viewing or an admin
const Actions = ({ viewing, me, where }) => {
  const [actioning, setActioning] = useState(false);
  const [loading, setLoading] = useState(false);
  const { hosts } = viewing;

  console.log('The hosts for the viewing => ', hosts);
  console.log('The hosts for the viewing => ', hosts);

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
      return <OnceViewing {...rest} />;
    case 'DAILY':
      return <DailyViewing {...rest} />;
    case 'WEEKLY':
      return <WeeklyViewing {...rest} />;
    default:
      return null;
  }
};

RenderViewingByRecurringType.propTypes = {
  viewing: PropTypes.object,
};

export default Viewings;
