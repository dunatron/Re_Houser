// i will get a list of viewings attached to the property
// i will also need to displayh like a calendar or something that will show when viewings are
// lol fuck I almost have to repeat that fucken server logic since the actual dates will be out of wack
import { useQuery } from '@apollo/client';
import { VIEWINGS_QUERY } from '../../graphql/queries';
import PropTypes from 'prop-types';

import Loading from '../Loader';
import Error from '../ErrorMessage';

// types
import OnceViewing from './types/Once';
import DailyViewing from './types/Daily';
import WeeklyViewing from './types/Weekly';

const Viewings = ({ where }) => {
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
      I am a list of viewings
      {data.viewings &&
        data.viewings.map((viewing, idx) => {
          return <RenderViewingByRecurringType viewing={viewing} />;
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

const RenderViewingByRecurringType = ({ viewing, ...rest }) => {
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
