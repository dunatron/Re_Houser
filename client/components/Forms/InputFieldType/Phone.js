import PropTypes from 'prop-types';
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
  return (
    <PhoneInput
      onChange={v => {
        console.log('Form input phone change => ', v);
      }}
    />
  );
};

Phone.propTypes = {
  config: PropTypes.any.isRequired,
  defaultValue: PropTypes.any.isRequired,
  defaultValues: PropTypes.any.isRequired,
  errors: PropTypes.any.isRequired,
  extractErrorFromErrors: PropTypes.any.isRequired,
  fieldError: PropTypes.any.isRequired,
  getValues: PropTypes.any.isRequired,
  onChange: PropTypes.any.isRequired,
  register: PropTypes.any.isRequired,
  reset: PropTypes.any.isRequired,
  setValue: PropTypes.any.isRequired,
  updateCacheOnRemovedFile: PropTypes.any.isRequired,
};

export default Phone;
