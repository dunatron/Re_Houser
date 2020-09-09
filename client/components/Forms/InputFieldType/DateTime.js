import React from 'react';
import TextInput from '../../Inputs/TextInput';

const DateTimeInput = props => {
  const { config, register, defaultValue, fieldError } = props;
  const { fieldProps, refConf } = config;
  return (
    <TextInput
      variant="outlined"
      {...fieldProps}
      defaultValue={defaultValue}
      inputRef={register(refConf)}
      error={fieldError ? true : false}
      helperText={fieldError}
      style={{ marginTop: 0 }}
      type={fieldProps.type ? fieldProps.type : 'datetime-local'}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};

export default DateTimeInput;
