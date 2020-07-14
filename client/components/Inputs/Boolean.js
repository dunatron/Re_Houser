import React from 'react';
import PropTypes from 'prop-types';
import { FormControlLabel, FormHelperText, Switch } from '@material-ui/core';

/**
 * Uncontrolled input component for performance becaus ethey are the best
 */
const BooleanInput = ({
  name,
  label,
  helperText,
  defaultChecked,
  handleChange,
  ...rest
}) => {
  return (
    <div>
      <FormControlLabel
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

export default BooleanInput;
