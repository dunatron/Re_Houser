import React from 'react';
import TextInput from '../../Inputs/TextInput';

const DateField = props => {
  const { config, register, fieldError } = props;
  const { fieldProps, refConf } = config;
  return (
    <TextInput
      variant="outlined"
      {...fieldProps}
      type={'date'}
      inputRef={register(refConf)}
      style={{ marginTop: 0 }}
      error={fieldError ? true : false}
      helperText={fieldError}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};

export default DateField;
