import PropTypes from 'prop-types';
import { Box, Typography, Chip } from '@material-ui/core';
import useStyles from './useStyles';
import moment from 'moment';

const makeFormatttedValue = (val, format) => {
  switch (format) {
    case 'LongDate':
      return moment(val).format('dddd, Do MMMM, YYYY');
    case 'ShortDate':
      return moment(val).format('Do MMM YYYY');
    case 'LongDateTime':
      return moment(val).format('dddd, Do MMMM, YYYY h:mm:ss a');
    case 'ShortDateTime':
      return moment(val).format('ddd, Do MMM, YYYY h:mmA');
    default:
      return moment(val).format(format);
  }
};

export default function DateDisplay({
  title,
  value,
  format,
  orientation = 'horizontal',
  variant = 'body2',
  titleProps,
  valueProps,
}) {
  const classes = useStyles({ orientation });
  const formattedValue = makeFormatttedValue(value, format);
  return (
    <Box className={classes.root}>
      {title && (
        <Typography className={classes.title} variant={variant} {...titleProps}>
          {title}
        </Typography>
      )}
      <Typography className={classes.value} variant={variant} {...valueProps}>
        {formattedValue}
      </Typography>
    </Box>
  );
}

DateDisplay.propTypes = {
  title: PropTypes.string,
  value: PropTypes.number.isRequired,
};
