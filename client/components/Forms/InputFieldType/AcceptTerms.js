import PropTypes from 'prop-types';
import React from 'react';
import FieldError from '../InputFieldType/FieldError';

//Material Components
import { Box, Typography, Checkbox, FormControlLabel } from '@material-ui/core';

const AcceptTerms = props => {
  const { config, register, errors, defaultValue } = props;
  const { fieldProps, refConf } = config;
  return (
    <>
      <Box
        component="div"
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
      </Box>
      <FieldError errors={errors} name={name} />
    </>
  );
};

AcceptTerms.propTypes = {
  config: PropTypes.shape({
    fieldProps: PropTypes.shape({
      label: PropTypes.any
    }),
    refConf: PropTypes.object.isRequired,
    terms: PropTypes.any
  }).isRequired,
  defaultValue: PropTypes.any.isRequired,
  errors: PropTypes.any.isRequired,
  register: PropTypes.func.isRequired
};

export default AcceptTerms;
