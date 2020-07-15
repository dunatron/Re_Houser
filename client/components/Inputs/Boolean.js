import React from 'react';
import PropTypes from 'prop-types';
import { FormControlLabel, FormHelperText, Switch } from '@material-ui/core';
import { withStyles } from '@material-ui//core/styles';

const styles = theme => ({
  wrapper: {
    marginBottom: theme.spacing(2),
  },
});

const BooleanInput = ({
  name,
  label,
  helperText,
  defaultChecked,
  handleChange,
  classes,
  ...rest
}) => {
  return (
    <div className={classes.wrapper}>
      <FormControlLabel
        fullWidth
        control={
          <Switch
            {...rest}
            defaultChecked={defaultChecked}
            onChange={e => handleChange(e.target.checked)}
            name={name}
          />
        }
        label={label}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </div>
  );
};

BooleanInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  helperText: PropTypes.string,
  defaultChecked: PropTypes.bool.isRequired, // the thought is a null value could be confused with false
  handleChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default withStyles(styles)(BooleanInput);
