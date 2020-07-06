import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../Inputs/TextInput';
import moment from 'moment';
import { is } from 'ramda';

import FieldError from '../InputFieldType/FieldError';

//Material Components
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const Int = props => {
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
  return (
    <TextInput
      variant="outlined"
      {...fieldProps}
      inputRef={register(refConf)}
      type="number"
      style={{ marginTop: 0 }}
      error={extractErrorFromErrors(errors, name) ? true : false}
      helperText={extractErrorFromErrors(errors, name)}
    />
  );
};

export default Int;
