import PropTypes from "prop-types";
import React, { Component } from 'react';
import { Typography } from '@material-ui/core';

const InputErrors = ({ errors }) => {
  if (!errors) return null;

  return (
    <div>
      {errors.map((err, i) => (
        <Typography key={i} component="div">
          <Typography variant="h6" color="error">
            {err}
          </Typography>
        </Typography>
      ))}
    </div>
  );
};

InputErrors.propTypes = {
  errors: PropTypes.shape({
    map: PropTypes.func
  }).isRequired
}

export default InputErrors;
