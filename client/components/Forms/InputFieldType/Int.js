import PropTypes from "prop-types";
import React, { useState } from 'react';
import TextInput from '../../Inputs/TextInput';

const Int = props => {
  const {
    config,
    onChange,
    register,
    errors,
    getValues,
    setValue,
    reset,
    defaultValues,
    defaultValue,
    updateCacheOnRemovedFile,
    fieldError,
  } = props;
  const { type, fieldProps, refConf } = config;
  return (
    <TextInput
      variant="outlined"
      {...fieldProps}
      inputRef={register(refConf)}
      type="number"
      style={{ marginTop: 0 }}
      error={fieldError ? true : false}
      helperText={fieldError}
    />
  );
};

Int.propTypes = {
  config: PropTypes.any.isRequired,
  defaultValue: PropTypes.any.isRequired,
  defaultValues: PropTypes.any.isRequired,
  errors: PropTypes.any.isRequired,
  fieldError: PropTypes.any.isRequired,
  getValues: PropTypes.any.isRequired,
  onChange: PropTypes.any.isRequired,
  register: PropTypes.func.isRequired,
  reset: PropTypes.any.isRequired,
  setValue: PropTypes.any.isRequired,
  updateCacheOnRemovedFile: PropTypes.any.isRequired
}

export default Int;
