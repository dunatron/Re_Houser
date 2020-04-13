import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../Inputs/TextInput';
import moment from 'moment';

import FieldError from '../InputFieldType/FieldError';

//Material Components
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import CheckReason from './CheckReason';
import CheckboxText from './CheckboxText';
import SelectOneWithText from './SelectOneWithText';
import CheckMultipleWithText from './CheckMultipleWithText';
import SelectMultipleEnum from './SelectMultipleEnum';

import { Typography, Checkbox } from '@material-ui/core';

const extractErrorFromErrors = (errors, name) => {
  if (!errors || !name) return null;
  return errors[name] ? errors[name].message : null;
};

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
  const { type, fieldProps, refConf } = config;
  // const { name, label } = fieldProps;
  // const name = 'test';
  // const label = 'test bal';
  const name = fieldProps ? fieldProps.name : null;
  const label = fieldProps ? fieldProps.label : null;
  // const label = 'test bal';
  // ToDo: ALL of these types need there own filewit PropTypes and all that fancy shit
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
            // error={errors[name] ? true : false}
            // helperText={errors[name] ? errors[name].message : null}
            error={extractErrorFromErrors(errors, name) ? true : false}
            helperText={extractErrorFromErrors(errors, name)}
            inputRef={register ? register(refConf) : null}
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
        />
      );
    case 'Float':
      return (
        <TextInput
          variant="outlined"
          {...fieldProps}
          inputRef={register(refConf)}
          type="number"
        />
      );

    case 'Date':
      return (
        <TextInput
          variant="outlined"
          {...fieldProps}
          type={'date'}
          inputRef={register(refConf)}
          helperText
          InputLabelProps={{
            shrink: true,
          }}
        />
      );
    case 'DateTime':
      return (
        <TextInput
          variant="outlined"
          {...fieldProps}
          defaultValue={defaultValue}
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
    //     //  classes,
    // values,
    // label,
    // selectID,
    // handleChange,
    // removeItem,
    case 'SelectMultipleEnum':
      console.log('Return the conf for a SlectctyEnum ', config);
      // missed an architectural decision. I bet, being careful with ...inputprops, including optionms for the types
      // with onChange at the top level eventually calling itslef e.g doths !doths()
      // You can reduce 88% of all this trash
      return (
        <SelectMultipleEnum
          {...fieldProps}
          __type={config.__type}
          onChange={() =>
            console.log(
              'That wicked witch of the west riding bitch, Carol Baskin. Killed her husband'
            )
          }
        />
      );
    // return '';
    default:
      return (
        <Typography>
          This Item has no type specified for a form input
        </Typography>
      );
    // default:
    //   return <TextInput {...props} onChange={e => onChange(e.target.value)} />;
  }
};
InputFieldType.propTypes = {
  type: PropTypes.oneOf([
    'Header',
    'Subheader',
    'String',
    'CheckReason',
    'CheckboxText',
    'SelectOneWithText',
    'CheckMultipleWithText',
    'Boolean',
    'Int',
    'Float',
    'Date',
    'DateTime',
    'AcceptTerms',
  ]),
  key: PropTypes.string,
  inners: PropTypes.arrayOf(PropTypes.instanceOf(InputFieldType)),
};

export default InputFieldType;
