import PropTypes from 'prop-types';
import React, { useState } from 'react';
import TextInput from '../../Inputs/TextInput';

const StringInput = props => {
  const { config, register, defaultValue, fieldError } = props;
  const { type, fieldProps, refConf } = config;
  const { name, label, ...restOfFieldProps } = fieldProps;

  // const helperText = useState(fieldProps.helperText);
  return (
    <>
      <TextInput
        variant="outlined"
        {...restOfFieldProps}
        defaultValue={defaultValue}
        name={name}
        label={label}
        style={{ marginTop: 0 }}
        error={fieldError ? true : false}
        // helperText={fieldError ? fieldError : helperText}
        inputRef={register ? register(refConf) : null}
      />
    </>
  );
};

StringInput.propTypes = {
  config: PropTypes.any,
  defaultValue: PropTypes.any,
  fieldError: PropTypes.any,
  register: PropTypes.func.isRequired,
};

export default StringInput;
