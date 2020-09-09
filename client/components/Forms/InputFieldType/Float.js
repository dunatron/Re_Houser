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

export default Float;
