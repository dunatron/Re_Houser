import PropTypes from 'prop-types';
import { Box, Typography, Chip, Icon } from '@material-ui/core';
import useStyles from './useStyles';

export default function Title({ value, spacing, ...rest }) {
  const classes = useStyles({ spacing });
  return (
    <Typography className={classes.root} {...rest}>
      {value}
    </Typography>
  );
}

Title.propTypes = {
  value: PropTypes.string.isRequired,
};
