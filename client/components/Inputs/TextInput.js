import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

// just use valid hml5 => https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types
const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: theme.spacing(1, 0),
  },
});

const TextInput = props => {
  const { classes, value, onChange } = props;
  return (
    <TextField
      className={classes.root}
      id="standard-name"
      label="Name"
      value={value}
      onChange={onChange}
      margin="normal"
      {...props}
    />
  );
};

TextInput.propTypes = {
  classes: PropTypes.any,
  onChange: PropTypes.any,
  value: PropTypes.any,
};

export default withStyles(styles)(TextInput);
