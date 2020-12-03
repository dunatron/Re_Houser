import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

// just use valid hml5 => https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types
const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});

const EmailInput = props => {
  const { id, classes, value, onChange } = props;
  return (
    <TextField
      id={id}
      label="email-default-label"
      value={value}
      onChange={onChange}
      margin="normal"
      {...props}
    />
  );
};

EmailInput.propTypes = {
  classes: PropTypes.any,
  onChange: PropTypes.any,
  value: PropTypes.any,
};

export default withStyles(styles)(EmailInput);
