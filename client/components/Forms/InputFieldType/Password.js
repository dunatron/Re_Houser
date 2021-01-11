// import PasswordField from 'material-ui-password-field';
import PasswordField from '@/Components/Inputs/Password';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import PhoneInput from '../../Inputs/PhoneInput';

//Material Components
import {
  FormHelperText,
  RadioGroup,
  Radio,
  FormControl,
  FormControlLabel,
  FormLabel,
} from '@material-ui/core';

import useStyles from '@/Components/Forms/useStyles';

// ToDo: setup the form stuff with phone input field
// probably easisit to manually register and update as needed
const PasswordInputField = ({
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
  clearError,
}) => {
  const classes = useStyles();
  const { type, fieldProps, refConf } = config;

  const { name, label, ...restOfFieldProps } = fieldProps;

  useEffect(() => {
    register({ name: name }, { ...config.refConf });
    return () => {};
  }, [config.refConf, name, register]);

  return (
    <>
      <PasswordField
        hintText={
          fieldProps.hintText ? fieldProps.hintText : 'At least 8 characters'
        }
        floatingLabelText={label}
        errorText={fieldError}
        {...restOfFieldProps}
        defaultValue={defaultValue}
        name={name}
        label={label}
        error={fieldError ? true : false}
        inputRef={register ? register(refConf) : null}
      />
    </>
  );
};

PasswordInputField.propTypes = {
  config: PropTypes.any,
};

export default PasswordInputField;
