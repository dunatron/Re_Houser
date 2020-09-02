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
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';

const SelectOneWithText = props => {
  const {
    register,
    config,
    errors,
    errorMessage,
    setValue,
    reset,
    defaultValue,
  } = props;
  const { type, inners, fieldProps, refConf } = config;
  const { name, label } = fieldProps;
  const { options } = fieldProps;

  const [currVal, setCurrVal] = useState(defaultValue);

  const handleChange = (event, optName) => {
    setCurrVal(event.target.value);
  };

  const canDisplayInner = (opt, inner) => {
    const isOptName = opt.name === currVal;
    const isTheCurrVal = inner.showOn.values.includes(currVal);
    if (isOptName && isTheCurrVal) return true;
    return false;
  };

  // const resolveShowOnParentVals = (config, inner) => {
  //   if (inner.parentShowVals.includes(currVal)) {
  //     return true;
  //   }
  //   return false;
  // };

  // const canDisplayInner = (config, inner) => {
  //   if (inner.parentShowVals) return resolveShowOnParentVals(config, inner);
  //   return true;
  // };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <FieldError errors={errors} name={name} />
      <RadioGroup
        onChange={handleChange}
        defaultValue={defaultValue}
        style={{ display: 'flex', flexDirection: 'column' }}>
        {options &&
          options.map((opt, i) => (
            <div key={i}>
              <FormControlLabel
                value={opt.name}
                control={
                  <Radio
                    // checked={true}
                    name={name}
                    inputRef={register ? register(refConf) : register}
                  />
                }
                label={opt.label}
              />
              {inners &&
                inners.map((inner, idx) => {
                  if (!canDisplayInner(opt, inner)) return null;
                  return (
                    <InputFieldType
                      {...props}
                      config={inner}
                      key={idx}
                      register={register}
                      errors={errors}
                    />
                  );
                })}
            </div>
          ))}
      </RadioGroup>
    </FormControl>
  );
};

export default SelectOneWithText;
