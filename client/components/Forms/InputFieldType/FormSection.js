import PropTypes from 'prop-types';
import React from 'react';
import { Paper, Typography, CardContent, Divider } from '@material-ui/core';
import InputFieldType from './index';

const FormSection = props => {
  const { register, config, errors } = props;
  const { inners, fieldProps } = config;
  const { label } = fieldProps;
  return (
    <>
      <CardContent style={{ padding: '8px' }}>
        {label && (
          <Typography
            variant="h6"
            gutterBottom
            style={{ marginBottom: '16px' }}>
            {label}
          </Typography>
        )}
        {inners &&
          inners.map((inner, idx) => {
            return (
              <InputFieldType
                {...props}
                config={inner}
                key={idx}
                register={register}
                errors={errors}
              />
            );
          })}
      </CardContent>
      <Divider />
    </>
  );
};

FormSection.propTypes = {
  config: PropTypes.any,
  errors: PropTypes.any,
  register: PropTypes.any,
};

export default FormSection;
