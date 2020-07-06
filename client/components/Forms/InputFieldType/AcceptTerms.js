import React, { useState } from 'react';
import FieldError from '../InputFieldType/FieldError';

//Material Components
import { Typography, Checkbox, FormControlLabel } from '@material-ui/core';

const AcceptTerms = props => {
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
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
        }}>
        <Typography style={{ maxWidth: '800px' }}>{config.terms}</Typography>
        <FormControlLabel
          control={
            <Checkbox
              {...fieldProps}
              defaultChecked={defaultValue}
              aria-label="LoginSwitch"
              inputRef={register(refConf)}
            />
          }
          label={config.fieldProps.label}
        />
      </div>
      <FieldError errors={errors} name={name} />
    </>
  );
};

export default AcceptTerms;
