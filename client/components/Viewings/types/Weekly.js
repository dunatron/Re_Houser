import PropTypes from 'prop-types';
import moment from 'moment';
import { Typography } from '@material-ui/core';

/**
 * Intermediate. convert to react way. hint useMemo
 */
const WeeklyViewing = ({ viewing, ...rest }) => {
  const viewingDateTime = moment(viewing.dateTime);
  let i = 0;
  let dates = [];

  while (i < 4) {
    let date = moment()
      .set({
        day: viewingDateTime.get('day'),
        hour: viewingDateTime.get('hour'),
        minute: viewingDateTime.get('minute'),
      })
      .add(i, 'weeks')
      .format('dddd MMMM Do YYYY, h:mm:ss a');
    dates.push(date);
    i++;
  }

  return (
    <div>
      <Typography>WEEKLY</Typography>
      <Typography component="ul">
        {dates.map((d, i) => (
          <Typography key={i} component="li">
            {d}
          </Typography>
        ))}
      </Typography>
    </div>
  );
};

WeeklyViewing.propTypes = {
  viewing: PropTypes.shape({
    dateTime: PropTypes.string,
  }),
};

export default WeeklyViewing;
