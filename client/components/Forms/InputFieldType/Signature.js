import Signature from '../../Signature';

const SignatureField = props => {
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
  const name = fieldProps ? fieldProps.name : null;
  const label = fieldProps ? fieldProps.label : null;
  return <Signature />;
};

export default SignatureField;
