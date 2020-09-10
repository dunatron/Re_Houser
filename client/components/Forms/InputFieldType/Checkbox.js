import PropTypes from "prop-types";
import React from 'react';
import { FormControlLabel, Checkbox } from '@material-ui/core';

import { InputFieldType } from './index';

const CheckboxFormInput = props => {
  const { config, register, errors, setValue, defaultValue } = props;
  const { fieldProps, refConf } = config;
  const name = fieldProps ? fieldProps.name : null;

  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            {...fieldProps}
            name={name}
            defaultChecked={defaultValue}
            inputRef={register ? register(refConf) : null}
            aria-label="Checkbox"
          />
        }
        label={props.label ? props.label : fieldProps.label}
      />
      {config.inners &&
        config.inners.map((inner, idx) => (
          <InputFieldType
            {...props}
            config={inner}
            key={idx}
            setValue={setValue}
            register={register}
            errors={errors}
          />
        ))}
    </>
  );
};

CheckboxFormInput.propTypes = {
  config: PropTypes.shape({
    inners: PropTypes.shape({
      map: PropTypes.func
    })
  }).isRequired,
  defaultValue: PropTypes.any.isRequired,
  errors: PropTypes.any.isRequired,
  label: PropTypes.any.isRequired,
  register: PropTypes.func.isRequired,
  setValue: PropTypes.any.isRequired
}

export default CheckboxFormInput;
