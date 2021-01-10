import { Typography, Chip } from '@material-ui/core';
import useViewStyles from './useViewStyles';
import { formatCentsToDollarsVal } from '@/Lib/formatCentsToDollars';
import { is } from 'ramda';

import moment from 'moment';

const DateTimeDisplay = ({ item }) => {
  const classes = useViewStyles();
  return (
    <Chip
      className={classes.chip}
      size="small"
      label={moment(item.value).format(
        item.format ? item.format : 'ddd Do MMM YYYY hh:mm a'
      )}
    />
  );
};

export default DateTimeDisplay;
