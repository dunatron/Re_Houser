import PropTypes from "prop-types";
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
import { isEmpty } from 'ramda';

const _preFormatCheckedOptions = (options, values) => {
  const valuesAsKeys = values
    ? values.reduce((obj, key) => {
        obj[key] = true;
        return obj;
      }, {})
    : {};
  return valuesAsKeys;
};

const CheckMultipleWithText = props => {
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

  // const [state, setState] = useState({ PARTIAL: true });
  const [state, setState] = useState(
    _preFormatCheckedOptions(options, defaultValue)
  );

  const handleChange = (event, optName) => {
    setState({ ...state, [optName]: event.target.checked });
  };

  const canDisplayInner = (opt, inner) => {
    const optionsStateValue = state[opt.name] ? state[opt.name] : false;
    const validInnerForOpt = inner.showOn.values.includes(opt.name);
    if (optionsStateValue && validInnerForOpt) return true;
    return false;
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <FieldError errors={errors} name={name} />
      <FormGroup>
        {options &&
          options.map((opt, i) => (
            <div key={i}>
              <FormControlLabel
                value={opt.name}
                control={
                  <Checkbox
                    checked={state[opt.name] ? state[opt.name] : false}
                    onChange={e => handleChange(e, opt.name)}
                    inputRef={register ? register(refConf) : null}
                    name={name}
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
      </FormGroup>
    </FormControl>
  );
};

CheckMultipleWithText.propTypes = {
  config: PropTypes.any.isRequired,
  defaultValue: PropTypes.any.isRequired,
  errorMessage: PropTypes.any.isRequired,
  errors: PropTypes.any.isRequired,
  register: PropTypes.func.isRequired,
  reset: PropTypes.any.isRequired,
  setValue: PropTypes.any.isRequired
}

export default CheckMultipleWithText;
