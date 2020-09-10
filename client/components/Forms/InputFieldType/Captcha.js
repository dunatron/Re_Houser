import PropTypes from "prop-types";
import React, { useRef, useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import FieldError from './FieldError';

const CaptchaField = props => {
  const { config, register, errors, setValue } = props;
  const { fieldProps } = config;
  const name = fieldProps ? fieldProps.name : null;

  const recaptchaRef = useRef();

  // const clearRecaptcha = () => recaptchaRef.current.reset();

  const handleTokenChange = token =>
    setValue(name, token, { shouldValidate: true, shouldDirty: true });

  useEffect(() => {
    register({ name: name }, { ...config.refConf });
    return () => {};
  }, [config.refConf, name, register]);

  return (
    <>
      <ReCAPTCHA
        data-cy="signin-recaptcha-component"
        ref={recaptchaRef}
        sitekey={process.env.GOOGLE_RECAPTCHA_SITE_KEY}
        onChange={handleTokenChange}
      />
      <FieldError errors={errors} name={name} />
    </>
  );
};

CaptchaField.propTypes = {
  config: PropTypes.shape({
    refConf: PropTypes.any
  }).isRequired,
  errors: PropTypes.any.isRequired,
  register: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired
}

export default CaptchaField;
