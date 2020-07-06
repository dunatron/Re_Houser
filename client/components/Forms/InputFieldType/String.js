import { useState } from 'react';

const StringInput = props => {
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
  } = props;
  const { type, fieldProps, refConf } = config;
  const name = fieldProps ? fieldProps.name : null;
  const label = fieldProps ? fieldProps.label : null;
  return (
    <>
      <TextInput
        variant="outlined"
        {...fieldProps}
        defaultValue={defaultValue}
        label={label}
        style={{ marginTop: 0 }}
        error={extractErrorFromErrors(errors, name) ? true : false}
        helperText={extractErrorFromErrors(errors, name)}
        inputRef={register ? register(refConf) : null}
      />
    </>
  );
};

export default StringInput;
