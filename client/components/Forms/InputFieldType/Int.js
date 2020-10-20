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
  config: PropTypes.any,
  defaultValue: PropTypes.any,
  defaultValues: PropTypes.any,
  errors: PropTypes.any,
  fieldError: PropTypes.any,
  getValues: PropTypes.any,
  onChange: PropTypes.any,
  register: PropTypes.func.isRequired,
  reset: PropTypes.any,
  setValue: PropTypes.any,
  updateCacheOnRemovedFile: PropTypes.any
}

export default Int;
