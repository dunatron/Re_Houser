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

export default CaptchaField;
