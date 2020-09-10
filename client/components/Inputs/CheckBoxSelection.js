import PropTypes from "prop-types";
import React from 'react';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const CheckBoxSelection = ({ options, handleOptionChange }) => {
  const handleChange = name => event => {
    handleOptionChange({ [name]: event.target.checked });
  };

  return (
    <div>
      {options.map((option, idx) => {
        return (
          <FormControlLabel
            key={idx}
            control={
              <Checkbox
                checked={option.show}
                onChange={handleChange(option.id)}
                value={option.id}
                color="primary"
                // indeterminate
              />
            }
            label={option.label}
          />
        );
      })}
    </div>
  );
};

CheckBoxSelection.propTypes = {
  handleOptionChange: PropTypes.func.isRequired,
  options: PropTypes.shape({
    map: PropTypes.func
  }).isRequired
}

export default CheckBoxSelection;
