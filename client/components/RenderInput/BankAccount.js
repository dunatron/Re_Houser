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
import StyledInput from './StyledInput';

import { _preFormatBankAccount } from '@/Components/Forms/formatters/formatBankAccount';

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

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

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired
};

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const PhoneInput = ({ defaultValue, fieldProps, onChange }) => {
  const name = fieldProps ? fieldProps.name : null;
  const label = fieldProps ? fieldProps.label : null;

  const handleOnChange = e => onChange(e.target.value);

  //_preFormatBankAccount

  console.log('Default Value for bank accoiunt => ', defaultValue);

  const formattedDefaultVal = defaultValue
    ? _preFormatBankAccount(defaultValue)
    : '';

  return (
    <FormControl variant="standard">
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Input
        placeholder="BB-bbbb-AAAAAAA-SSS"
        id={name}
        name={fieldProps.name}
        defaultValue={formattedDefaultVal}
        onChange={handleOnChange}
        label={label}
        inputComponent={TextMaskCustom}
        {...fieldProps}
      />

      {fieldProps.helperText && (
        <FormHelperText>{fieldProps.helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

PhoneInput.propTypes = {
  defaultValue: PropTypes.any,
  fieldProps: PropTypes.shape({
    helperText: PropTypes.any,
    label: PropTypes.any,
    name: PropTypes.any
  }).isRequired,
  onChange: PropTypes.func.isRequired
};

export default PhoneInput;
