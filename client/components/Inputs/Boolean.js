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
  classes: PropTypes.shape({
    wrapper: PropTypes.any,
  }).isRequired,
  defaultChecked: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  helperText: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default withStyles(styles)(BooleanInput);
