import PropTypes from 'prop-types';
import { Box, Typography, Chip, Icon } from '@material-ui/core';
import useStyles from './useStyles';

// Our db values are in cents
const formatCentsToDollarsVal = amount => {
  const dollarAmount = amount / 100;
  const formattedMoney = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(dollarAmount); // '$100.00'

  return formattedMoney;
};

export default function Money({
  value,
  title,
  icon,
  orientation = 'horizontal',
  reverse,
  variant = 'h6',
  titleProps,
  valueProps,
  iconProps,
}) {
  const classes = useStyles({ orientation, reverse });
  const formattedValue = formatCentsToDollarsVal(value);
  return (
    <Box className={classes.root}>
      {icon && (
        <Icon className={classes.icon} {...iconProps}>
          {icon}
        </Icon>
      )}
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

Money.propTypes = {
  title: PropTypes.string,
  value: PropTypes.number.isRequired,
};
