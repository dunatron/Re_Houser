import PropTypes from "prop-types";
import React, { useState } from 'react';

import FieldError from '../InputFieldType/FieldError';

//Material Components
import {
  Typography,
  Checkbox,
  Paper,
  FormControlLabel,
  Switch,
} from '@material-ui/core';

const Info = props => {
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
  } = props;
  const { type, fieldProps, refConf } = config;
  const name = fieldProps ? fieldProps.name : null;
  const label = fieldProps ? fieldProps.label : null;
  return (
    <>
      {config.content}
      <FieldError errors={errors} name={name} />
    </>
  );
};

Info.propTypes = {
  config: PropTypes.shape({
    content: PropTypes.any
  }).isRequired,
  defaultValue: PropTypes.any.isRequired,
  defaultValues: PropTypes.any.isRequired,
  errors: PropTypes.any.isRequired,
  getValues: PropTypes.any.isRequired,
  onChange: PropTypes.any.isRequired,
  register: PropTypes.any.isRequired,
  reset: PropTypes.any.isRequired,
  setValue: PropTypes.any.isRequired,
  updateCacheOnRemovedFile: PropTypes.any.isRequired
}

export default Info;
