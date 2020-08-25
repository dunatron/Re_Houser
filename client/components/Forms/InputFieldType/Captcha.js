import { useRef, useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import Error from './FieldError';
import FieldError from './FieldError';

const CaptchaField = props => {
  const {
    config,
    onChange,
    register,
    errors,
    getValues,
    setValue,
    clearError,
    reset,
    defaultValues,
    defaultValue,
    updateCacheOnRemovedFile,
  } = props;
  const { type, fieldProps, refConf } = config;
  const name = fieldProps ? fieldProps.name : null;
  const label = fieldProps ? fieldProps.label : null;

  const recaptchaRef = useRef();

  const clearRecaptcha = () => recaptchaRef.current.reset();

  const handleTokenChange = token => {
    console.log('A token change => ', token);
    console.log('Name of token field => ', name);
    setValue(name, token, { shouldValidate: true, shouldDirty: true });
    // setValue('WTD', 'captchaToken');

    // clearError(name);
  };

  useEffect(() => {
    register({ name: name }, { ...config.refConf });
    return () => {};
  }, []);

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
