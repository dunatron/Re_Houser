import React from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import TextInput from '../../Inputs/TextInput';
import FormControl from '@material-ui/core/FormControl';

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        '(',
        /[1-9]/,
        /\d/,
        /\d/,
        ')',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const MoneyField = props => {
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
  } = props;
  const { type, fieldProps, refConf } = config;

  return (
    <TextInput
      variant="outlined"
      defaultValue={defaultValues[fieldProps.name]}
      inputRef={register(refConf)}
      style={{ marginTop: 0 }}
      {...fieldProps}
      error={fieldError ? true : false}
      helperText={fieldError}
      InputProps={{
        inputComponent: NumberFormatCustom,
      }}
    />
  );
};

MoneyField.propTypes = {
  config: PropTypes.any,
  defaultValue: PropTypes.any,
  defaultValues: PropTypes.any,
  errors: PropTypes.any,
  fieldError: PropTypes.any,
  getValues: PropTypes.any,
  onChange: PropTypes.any,
  register: PropTypes.func.isRequired,
  reset: PropTypes.any,
  setValue: PropTypes.any,
  updateCacheOnRemovedFile: PropTypes.any,
};

export default MoneyField;
