import PropTypes from 'prop-types';
import moment from 'moment';
import { Typography } from '@material-ui/core';

/**
 * Intermediate. convert to react way. hint useMemo
 */
const DailyViewing = ({ viewing, ...rest }) => {
  let i = 0;
  // just get the time of the viewing
  let time = moment(viewing.dateTime, 'HH:mm');

  let dates = [];
  while (i < 7) {
    // get todays date
    let date = moment()
      // specifically set the time of the viewing
      .set({
        hour: time.get('hour'),
        minute: time.get('minute'),
      })
      // add on the next day for next 7 days
      .add(i, 'days')
      .format('dddd MMMM Do YYYY, h:mm:ss a');
    dates.push(date);
    i++;
  }
  return (
    <div>
      <Typography>DAILY</Typography>
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

DailyViewing.propTypes = {
  viewing: PropTypes.shape({
    dateTime: PropTypes.string
  }).isRequired
};

export default DailyViewing;
