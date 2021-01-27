import PropTypes from 'prop-types';
import { Box, Typography, Chip } from '@material-ui/core';
import useStyles from './useStyles';

export default function ChipItems({
  items = [],
  title,
  size = 'small',
  color = 'secondary',
  titleProps,
  ...rest
}) {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Typography {...titleProps}>{title}</Typography>
      <Box className={classes.items}>
        {items.map((item, idx) => (
          <Chip
            {...rest}
            className={classes.chip}
            label={item}
            key={idx}
            size={size}
            color={color}
          />
        ))}
      </Box>
    </Box>
  );
}

ChipItems.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'outlined']),
  size: PropTypes.oneOf(['small', 'medium']),
};
