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
  clearError,
}) => {
  const { type, fieldProps, refConf } = config;
  const name = fieldProps ? fieldProps.name : null;
  const label = fieldProps ? fieldProps.label : null;
  const classes = useStyles();

  useEffect(() => {
    register({ name: name }, { ...config.refConf });
    return () => {};
  }, [config.refConf, name, register]);

  return (
    <>
      <FormControl
        className={classes.formControl}
        error={fieldError ? true : false}>
        <PhoneInput
          label={fieldProps.label}
          onChange={v => {
            setValue(config.key, v);
            clearError(name);
          }}
          // variant="outlined"
          // variant="outlined"
          helperText={fieldError}
          error={fieldError ? true : false}
          {...fieldProps}
        />
      </FormControl>
    </>
  );
};

Phone.propTypes = {
  config: PropTypes.any,
  defaultValue: PropTypes.any,
  defaultValues: PropTypes.any,
  errors: PropTypes.any,
  extractErrorFromErrors: PropTypes.any,
  fieldError: PropTypes.any,
  getValues: PropTypes.any,
  onChange: PropTypes.any,
  register: PropTypes.any,
  reset: PropTypes.any,
  setValue: PropTypes.any,
  updateCacheOnRemovedFile: PropTypes.any,
};

export default Phone;
