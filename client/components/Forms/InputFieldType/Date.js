import PropTypes from "prop-types";
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

DateField.propTypes = {
  config: PropTypes.any.isRequired,
  fieldError: PropTypes.any.isRequired,
  register: PropTypes.func.isRequired
}

export default DateField;
