import PropTypes from "prop-types";
import React from 'react';

const FieldError = ({ errors, name }) => {
  if (!errors) return null;
  const fieldHasError = errors[name];
  if (!fieldHasError) return null;
  return (
    <p style={{ color: 'red' }}>
      {fieldHasError ? errors[name].message : null}
    </p>
  );
};

FieldError.propTypes = {
  errors: PropTypes.any,
  name: PropTypes.any
}

export default FieldError;
