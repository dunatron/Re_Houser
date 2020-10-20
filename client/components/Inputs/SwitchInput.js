import PropTypes from "prop-types";
import React from 'react';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const SwitchInput = ({ checked, onChange, label, checkedLabel = label }) => {
  return (
    <FormControlLabel
      control={
        <Switch
          checked={checked}
          onChange={onChange}
          aria-label="LoginSwitch"
        />
      }
      label={checked ? checkedLabel : label}
    />
  );
};

SwitchInput.propTypes = {
  checked: PropTypes.any,
  checkedLabel: PropTypes.any,
  label: PropTypes.any,
  onChange: PropTypes.any
}

export default SwitchInput;
