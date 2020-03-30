import React, { useState } from 'react';

import InputFieldType from './index';
import FieldError from './FieldError';
//Material Components
import Switch from '@material-ui/core/Switch';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';

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
    defaultValue,
  } = props;
  const { type, inners, fieldProps, refConf } = config;
  const { name, label } = fieldProps;
  const [currVal, setCurrVal] = useState(_preFormatCheckReason(defaultValue));

  console.log('Check Reason defaultValue => ', defaultValue);
  console.log('Check Reason currVal => ', currVal);

  const handleChange = event => {
    setCurrVal(event.target.value);

    // if (event.target.value === 'Yes') {
    //   // simply refreshes error state for the form
    //   reset(
    //     {
    //       [name]: event.target.value,
    //     },
    //     {
    //       errors: false, // errors will be reset
    //       dirtyFields: true, // dirtyFields will not be reset
    //       dirty: true, // dirty will not be reset
    //     }
    //   );
    // }
  };

  const canDisplayInner = inner => {
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
            control={<Radio name={name} inputRef={register(refConf)} />}
            label="Yes"
          />
          <FormControlLabel
            value="No"
            control={<Radio name={name} inputRef={register(refConf)} />}
            label="No"
          />
        </RadioGroup>
      </FormControl>

      {inners &&
        inners.map((inner, idx) => {
          if (!canDisplayInner(inner)) return null;
          return (
            <InputFieldType
              config={inner}
              key={idx}
              register={register}
              errors={errors}
            />
          );
        })}
    </>
  );
};

export default CheckReason;