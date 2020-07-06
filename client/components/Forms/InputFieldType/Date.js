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
      error={extractErrorFromErrors(errors, name) ? true : false}
      helperText={extractErrorFromErrors(errors, name)}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};

export default DateField;
