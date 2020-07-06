import TextInput from '../../Inputs/TextInput';

const DateField = props => {
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
  return (
    <TextInput
      variant="outlined"
      {...fieldProps}
      type={'date'}
      inputRef={register(refConf)}
      style={{ marginTop: 0 }}
      error={fieldError ? true : false}
      helperText={fieldError}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};

export default DateField;
