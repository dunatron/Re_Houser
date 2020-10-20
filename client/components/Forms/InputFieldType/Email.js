import PropTypes from 'prop-types';
import React, { useState } from 'react';
import TextInput from '../../Inputs/TextInput';

const EmailInput = props => {
  const { config, register, defaultValue, fieldError } = props;
  const { type, fieldProps, refConf } = config;
  const name = fieldProps ? fieldProps.name : null;
  const label = fieldProps ? fieldProps.label : null;

  const helperText = useState(fieldProps.helperText);
  return (
    <>
      <TextInput
        variant="outlined"
        {...fieldProps}
        defaultValue={defaultValue}
        name={name}
        label={label}
        style={{ marginTop: 0 }}
        error={fieldError ? true : false}
        helperText={fieldError ? fieldError : helperText}
        inputRef={register ? register(refConf) : null}
      />
    </>
  );
};

EmailInput.propTypes = {
  config: PropTypes.any,
  defaultValue: PropTypes.any,
  fieldError: PropTypes.any,
  register: PropTypes.func.isRequired,
};

export default EmailInput;
