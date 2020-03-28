import React, { useState } from 'react';
import TextInput from '../../Inputs/TextInput';

import FieldError from '../InputFieldType/FieldError';

//Material Components
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import CheckReason from './CheckReason';
import CheckboxText from './CheckboxText';
import SelectOneWithText from './SelectOneWithText';
import CheckMultipleWithText from './CheckMultipleWithText';

import { Typography, Checkbox } from '@material-ui/core';

const InputFieldType = props => {
  // const { onChange, errors, errorMessage, name, fieldProps } = props;
  const {
    config,
    onChange,
    register,
    errors,
    setValue,
    reset,
    defaultValues,
    defaultValue,
  } = props;
  const { type, fieldProps, refConf, errorMessage } = config;
  const { name, label } = fieldProps;
  switch (type) {
    case 'Header':
      // return <TextInput {...props} onChange={e => onChange(e.target.value)} />;
      return <Typography variant="h4">{label}</Typography>;
    case 'Subheader':
      return <Typography variant="h5">{label}</Typography>;
    case 'String':
      // return <TextInput {...props} onChange={e => onChange(e.target.value)} />;
      return (
        <>
          <TextInput
            variant="outlined"
            {...fieldProps}
            defaultValue={defaultValue}
            label={label}
            error={errors[name] ? true : false}
            helperText={errors[name] ? errors[name].message : null}
            inputRef={register(refConf)}
          />
        </>
      );
    case 'CheckReason':
      return <CheckReason {...props} />;
    case 'CheckboxText':
      return <CheckboxText {...props} />;
    case 'SelectOneWithText':
      return <SelectOneWithText {...props} />;
    case 'CheckMultipleWithText':
      return <CheckMultipleWithText {...props} />;

    case 'Boolean':
      return (
        <FormControlLabel
          control={<Switch {...props} aria-label="LoginSwitch" />}
          label={props.label}
        />
      );
    case 'Int':
      return (
        <TextInput
          variant="outlined"
          {...fieldProps}
          inputRef={register(refConf)}
          type="number"
          onChange={e => onChange(parseInt(e.target.value))}
        />
      );
    case 'Float':
      return (
        <TextInput
          variant="outlined"
          {...fieldProps}
          inputRef={register(refConf)}
          type="number"
          onChange={e => onChange(parseFloat(e.target.value))}
        />
      );
    case 'DateTime':
      return (
        <TextInput
          variant="outlined"
          {...fieldProps}
          inputRef={register(refConf)}
          helperText
          type={fieldProps.type ? fieldProps.type : 'datetime-local'}
          // type="datetime-local"
          // type="date"
          InputLabelProps={{
            shrink: true,
          }}
        />
      );
    case 'AcceptTerms':
      return (
        <>
          <div
            style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            <FormControlLabel
              control={
                <Checkbox
                  {...fieldProps}
                  defaultChecked={defaultValue}
                  aria-label="LoginSwitch"
                  inputRef={register(refConf)}
                />
              }
              // label={fieldProps.label}
            />
            <Typography style={{ maxWidth: '800px' }}>
              {config.terms}
            </Typography>
          </div>
          <FieldError errors={errors} name={name} />
        </>
      );
    default:
      return <TextInput {...props} onChange={e => onChange(e.target.value)} />;
  }
};
export default InputFieldType;
