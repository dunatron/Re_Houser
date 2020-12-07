import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PasswordField from 'material-ui-password-field';

// just use valid hml5 => https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types
const styles = theme => ({
  //   root: {
  //     display: 'flex',
  //     flexWrap: 'wrap',
  //   },
});

const PasswordInput = props => {
  const { classes, value, onChange } = props;
  return (
    <PasswordField
      // password props
      hintText="At least 8 characters"
      floatingLabelText="Enter your password"
      errorText="Your password is too short"
      value={value}
      onChange={onChange}
      //   margin="normal"
      {...props}
    />
  );
};

PasswordInput.propTypes = {
  classes: PropTypes.any,
  onChange: PropTypes.any,
  value: PropTypes.any,
};

export default withStyles(styles)(PasswordInput);
