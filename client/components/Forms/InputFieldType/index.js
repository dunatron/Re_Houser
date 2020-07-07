import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../Inputs/TextInput';
import moment from 'moment';
import { is } from 'ramda';

import FieldError from '../InputFieldType/FieldError';

//Material Components
import {
  Typography,
  Checkbox,
  Paper,
  FormControlLabel,
  Switch,
} from '@material-ui/core';

import CheckReason from './CheckReason';
import CheckboxText from './CheckboxText';
import SelectOneWithText from './SelectOneWithText';
import CheckMultipleWithText from './CheckMultipleWithText';
import SelectMultipleEnum from './SelectMultipleEnum';
import SelectOneEnum from './SelectOneEnum';
import Location from './Location';
import LocationPicker from '../../LocationPicker';
import FormSection from './FormSection';
import EntityFormType from './Entity';
import FileUploader from './../../FileUploader';
import File from './File';
import String from './String';
import Boolean from './Boolean';
import Int from './Int';
import Float from './Float';
import DateField from './Date';
import AcceptTerms from './AcceptTerms';
import Info from './Info';

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
    getValues,
    setValue,
    reset,
    rawData,
    defaultValues,
    updateCacheOnRemovedFile,
  } = props;
  const { type, fieldProps, refConf } = config;
  const name = fieldProps ? fieldProps.name : null;
  const label = fieldProps ? fieldProps.label : null;

  const fieldError = extractErrorFromErrors(errors, name);

  const defaultValue = defaultValues[name];

  console.log('name for this here field => ', name);
  console.log('defaultValue for this here field => ', defaultValue);

  const TypeToRender = () => {
    switch (type) {
      case 'Header':
        return <Typography variant="h4">{label}</Typography>;
      case 'Subheader':
        return <Typography variant="h5">{label}</Typography>;
      case 'Section':
        return <FormSection {...props} />;
      case 'String':
        return (
          <String
            {...props}
            fieldError={fieldError}
            defaultValue={defaultValue}
          />
        );
      case 'CheckReason':
        return <CheckReason {...props} />;
      case 'CheckboxText':
        return <CheckboxText {...props} />;
      case 'SelectOneWithText':
        return <SelectOneWithText {...props} />;
      case 'CheckMultipleWithText':
        return <CheckMultipleWithText {...props} />;
      case 'Entity':
        return (
          <EntityFormType
            {...fieldProps}
            __type={config.__type}
            onChange={() => {}}
            {...props}
          />
        );
      case 'SelectMultipleEnum':
        return (
          <SelectMultipleEnum
            {...fieldProps}
            {...props}
            __type={config.__type}
            onChange={() => {}}
            helperText={fieldError}
          />
        );
      case 'SelectOneEnum':
        return (
          <SelectOneEnum
            {...fieldProps}
            {...props}
            __type={config.__type}
            onChange={() => {}}
            helperText={fieldError}
          />
        );
      case 'Location':
        return (
          <Location
            {...props}
            fieldError={fieldError}
            defaultValue={defaultValue}
          />
        );
      case 'Boolean':
        return (
          <Boolean
            {...props}
            fieldError={fieldError}
            defaultValue={defaultValue}
          />
        );
      case 'Int':
        return (
          <Int {...props} fieldError={fieldError} defaultValue={defaultValue} />
        );
      case 'Float':
        return (
          <Float
            {...props}
            fieldError={fieldError}
            defaultValue={defaultValue}
          />
        );

      case 'Date':
        return (
          <DateField
            {...props}
            fieldError={fieldError}
            defaultValue={defaultValue}
          />
        );
      case 'DateTime':
        return (
          <DateTimeInput
            {...props}
            fieldError={fieldError}
            defaultValue={defaultValue}
          />
        );
      case 'AcceptTerms':
        return (
          <AcceptTerms
            {...props}
            fieldError={fieldError}
            defaultValue={defaultValue}
          />
        );
      case 'Info':
        return <Info {...props} />;
      case 'File':
        return (
          <File
            {...props}
            extractErrorFromErrors={extractErrorFromErrors}
            fieldError={fieldError}
          />
        );
      default:
        return (
          <Typography>
            This Item has no type specified for a form input type of {type}
          </Typography>
        );
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '16px',
      }}>
      {TypeToRender()}
    </div>
  );
};

// };
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
  inners: PropTypes.arrayOf(PropTypes.instanceOf(InputFieldType)),
};

export { InputFieldType };
export default InputFieldType;
