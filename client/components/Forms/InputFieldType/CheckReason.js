import PropTypes from 'prop-types';
import React, { useState } from 'react';
import InputFieldType from './index';
import FieldError from './FieldError';
//Material Components
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const _preFormatCheckReason = defaultValue => {
  if (defaultValue === true) return 'Yes';
  if (defaultValue === false) return 'No';
  return defaultValue;
};

const CheckReason = props => {
  const {
    register,
    config,
    errors,
    errorMessage,
    setValue,
    reset,
    defaultValues,
    // defaultValue,
  } = props;
  const { type, inners, fieldProps, refConf } = config;
  const { name, label } = fieldProps;
  const defaultValue = defaultValues[name];
  const [currVal, setCurrVal] = useState(_preFormatCheckReason(defaultValue));
  const handleChange = event => {
    setCurrVal(event.target.value);
  };

  const resolveShowOnParentVals = (config, inner) => {
    if (inner.parentShowVals.includes(currVal)) return true;
    return false;
  };

  const canDisplayInner = (config, inner) => {
    // if (!canDisplayInner(, inner)) return null;

    if (inner.parentShowVals) return resolveShowOnParentVals(config, inner);

    if (currVal === 'No') return true;
    return false;
  };

  return (
    <>
      <FormControl component="fieldset">
        <FormLabel component="legend">{label}</FormLabel>
        <FieldError errors={errors} name={name} />
        <RadioGroup
          onChange={handleChange}
          defaultValue={defaultValue}
          style={{ display: 'flex', flexDirection: 'row' }}>
          <FormControlLabel
            value="Yes"
            control={
              <Radio
                name={name}
                inputRef={register ? register(refConf) : null}
              />
            }
            label="Yes"
          />
          <FormControlLabel
            value="No"
            control={
              <Radio
                name={name}
                inputRef={register ? register(refConf) : null}
              />
            }
            label="No"
          />
        </RadioGroup>
      </FormControl>

      {inners &&
        inners.map((inner, idx) => {
          if (!canDisplayInner(config, inner)) return null;
          return (
            <div key={inner.key} style={{ marginTop: '16px' }}>
              <InputFieldType
                {...props}
                config={inner}
                key={idx}
                register={register}
                errors={errors}
                setValue={setValue}
                reset={reset}
                defaultValues={defaultValues}
              />
            </div>
          );
        })}
    </>
  );
};

CheckReason.propTypes = {
  config: PropTypes.any,
  defaultValues: PropTypes.any,
  errorMessage: PropTypes.any,
  errors: PropTypes.any,
  register: PropTypes.func.isRequired,
  reset: PropTypes.any,
  setValue: PropTypes.any
};

export default CheckReason;
