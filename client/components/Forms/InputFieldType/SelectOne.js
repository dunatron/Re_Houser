import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  Select,
  InputLabel,
  FormHelperText,
  FormControl,
  MenuItem,
  TextField,
} from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { GET_ENUM_QUERY } from '../../../graphql/queries';
import Error from '../../ErrorMessage';
import Loader from '../../Loader';
import FieldError from './FieldError';
import { is } from 'ramda';
import InputFieldType from './index';
import useStyles from '@/Components/Forms/useStyles';

// experimental
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function SelectOne(props) {
  const classes = useStyles();
  const {
    __type,
    values,
    getValues,
    label,
    selectID,
    handleChange,
    removeItem,
    register,
    unregister,
    config,
    setValue, // is from useForm
    reset,
    errors,
    defaultValues,
    helperText,
    fieldError,
    clearError,
    options,
  } = props;

  const formatOptions = options
    ? options.map((o, idx) => ({
        label: o.label,
        value: o.value,
      }))
    : [];

  const { fieldProps } = config;

  const handleOnValueChange = () => {};

  return (
    <>
      <Autocomplete
        style={{ marginBottom: '16px' }}
        id={`${selectID}-label`}
        variant={fieldProps.variant ? fieldProps.variant : 'outlined'}
        options={formatOptions}
        getOptionLabel={option => option.label}
        getOptionSelected={(option, value) => option.value === value.value}
        onChange={handleOnValueChange}
        renderInput={params => (
          <TextField
            {...params}
            {...fieldProps}
            error={fieldError ? true : false}
            label={fieldProps.label}
            variant="outlined"
            helperText={fieldError}
          />
        )}
      />
    </>
  );
}

SelectOne.propTypes = {
  __type: PropTypes.any,
  clearError: PropTypes.func.isRequired,
  config: PropTypes.shape({
    key: PropTypes.any,
  }).isRequired,
  defaultValues: PropTypes.any,
  errors: PropTypes.any,
  fieldError: PropTypes.any,
  getValues: PropTypes.any,
  handleChange: PropTypes.any,
  helperText: PropTypes.any,
  label: PropTypes.any,
  register: PropTypes.func.isRequired,
  removeItem: PropTypes.any,
  reset: PropTypes.any,
  selectID: PropTypes.any,
  setValue: PropTypes.func.isRequired,
  values: PropTypes.any,
};
