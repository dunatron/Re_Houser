import PropTypes from 'prop-types';
import mePropTypes from '../../propTypes/mePropTypes';
// types
import OnceViewing from './types/Once';
import DailyViewing from './types/Daily';
import WeeklyViewing from './types/Weekly';

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
  viewing: PropTypes.shape({
    recurringType: PropTypes.string.isRequired,
  }),
  me: mePropTypes,
};

export default RenderViewingByRecurringType;
