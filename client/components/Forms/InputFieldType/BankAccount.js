import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { FormHelperText } from '@material-ui/core';

import FieldError from './FieldError';

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  console.log('TextMaskCustom props => ', props);
  // BB-bbbb-AAAAAAA-SSS
  // https://en.wikipedia.org/wiki/New_Zealand_bank_account_number#:~:text=Electronic%20Clearing%20System-,Format%20of%20account%20numbers,(2%20or%203%20digits).
  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
      ]}
      placeholderChar={'\u2000'}
      // showMask
    />
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const PhoneInput = props => {
  const {
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
  } = props;
  const { type, fieldProps, refConf } = config;
  const name = fieldProps ? fieldProps.name : null;
  const label = fieldProps ? fieldProps.label : null;

  const handleChange = e => {
    setValue(fieldProps.name, e.target.value);
  };

  // register({ name: fieldProps.name }, refConf);

  useEffect(() => {
    register({ name: fieldProps.name }, refConf);
    if (defaultValue) {
      setValue(fieldProps.name, defaultValue);
    }
  }, []);

  console.log('defaultValue => ', defaultValue);

  return (
    <FormControl variant="outlined">
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <OutlinedInput
        placeholder="BB-bbbb-AAAAAAA-SSS"
        id={name}
        name={fieldProps.name}
        defaultValue={defaultValue}
        // inputRef={register ? register(refConf) : null}
        // value={maskVal}
        onChange={handleChange}
        label={label}
        inputComponent={TextMaskCustom}
        {...fieldProps}
      />

      {fieldProps.helperText && (
        <FormHelperText>{fieldProps.helperText}</FormHelperText>
      )}
      <FieldError errors={errors} name={name} />
    </FormControl>
  );
};

export default PhoneInput;
