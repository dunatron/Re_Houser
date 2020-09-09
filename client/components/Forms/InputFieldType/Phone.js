import React from 'react';
import PhoneInput from '../../Inputs/PhoneInput';

// ToDo: setup the form stuff with phone input field
// probably easisit to manually register and update as needed
const Phone = ({
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
  extractErrorFromErrors,
}) => {
  return (
    <PhoneInput
      onChange={v => {
        console.log('Form input phone change => ', v);
      }}
    />
  );
};

export default Phone;
