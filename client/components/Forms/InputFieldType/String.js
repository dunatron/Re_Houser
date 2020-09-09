import React, { useState } from 'react';
import TextInput from '../../Inputs/TextInput';

const StringInput = props => {
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

export default StringInput;
