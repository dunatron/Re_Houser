import PropTypes from 'prop-types';
import { Box, Typography, Chip, Icon } from '@material-ui/core';
import useStyles from './useStyles';

export default function StringDisplay({
  icon,
  value,
  title,
  orientation = 'horizontal',
  reverse,
  variant = 'body2',
  titleProps,
  valueProps,
  iconProps,
  gutterBottom,
  ...rest
}) {
  const classes = useStyles({ orientation, gutterBottom, reverse });
  return (
    <Box className={classes.root}>
      {icon && (
        <Icon className={classes.icon} {...iconProps}>
          {icon}
        </Icon>
      )}
      {title && (
        <Typography
          className={classes.title}
          variant={variant}
          {...titleProps}
          {...rest}>
          {title}
        </Typography>
      )}
      <Typography
        className={classes.value}
        variant={variant}
        {...valueProps}
        {...rest}>
        {value}
      </Typography>
    </Box>
  );
}

StringDisplay.propTypes = {
  title: PropTypes.string,
  value: PropTypes.number.isRequired,
  iconProps: PropTypes.shape({
    color: PropTypes.oneOf([
      'inherit',
      'primary',
      'secondary',
      'action',
      'error',
      'disabled',
    ]),
    fontSize: PropTypes.oneOf(['inherit', 'default', 'small', 'large']),
  }),
};
