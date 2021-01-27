---
name: Displays
menu: Components
---

import { Playground, Props } from 'docz'
# Forms

- ToDo: being able to copy paste configs would be super awesome

## Displays Usage

The idea of the `Displays` HOC is to provide a way to create standard displays for types.

- consider onSave and onCreate
- or let the outer wrapper handle onSubmit?
- the second. It should just submit the data to its container. its container can work out if its create or update
- Side note. We are creatting these containers like `Components/Forms/InsulationForm` is a wrapper to handle all this


## Creating a new Display template
```js 
import PropTypes from 'prop-types';
import { Box, Typography, Chip } from '@material-ui/core';
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
  orientation = 'horizontal',
  variant = 'h6',
  titleProps,
  valueProps,
}) {
  const classes = useStyles({ orientation });
  const formattedValue = formatCentsToDollarsVal(value);
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

Money.propTypes = {
  title: PropTypes.string,
  value: PropTypes.number.isRequired,
};
```

The `.useStyles` file
```js
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: props =>
        props.orientation === 'vertical' ? `flex-start` : `flex-end`,
      flexDirection: props =>
        props.orientation === 'vertical' ? `column` : `row`,
    },
    title: {
      margin: theme.spacing(0, 1, 0, 0),
    },
  })
);

export default useStyles;
```
