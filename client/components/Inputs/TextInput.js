import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

// just use valid hml5 => https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types
const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    // maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
  noLabel: {
    marginTop: theme.spacing.unit * 3,
  },
});

const TextInput = props => {
  const { classes, value, onChange } = props;
  return (
    <TextField
      id="standard-name"
      label="Name"
      className={classes.textField}
      value={value}
      onChange={onChange}
      margin="normal"
      {...props}
    />
  );
};

export default withStyles(styles)(TextInput);
