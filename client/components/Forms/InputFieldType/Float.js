import PropTypes from "prop-types";
import React from 'react';
import TextInput from '../../Inputs/TextInput';

const Float = props => {
  const { config, register, errors, extractErrorFromErrors } = props;
  const { fieldProps, refConf } = config;
  const name = fieldProps ? fieldProps.name : null;
  return (
    <TextInput
      variant="outlined"
      {...fieldProps}
      inputRef={register(refConf)}
      type="number"
      style={{ marginTop: 0 }}
      error={extractErrorFromErrors(errors, name) ? true : false}
      helperText={extractErrorFromErrors(errors, name)}
    />
  );
};

Float.propTypes = {
  config: PropTypes.any,
  errors: PropTypes.any,
  extractErrorFromErrors: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired
}

export default Float;
