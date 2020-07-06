const DateTimeInput = props => {
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
      defaultValue={defaultValue}
      inputRef={register(refConf)}
      error={extractErrorFromErrors(errors, name) ? true : false}
      helperText={extractErrorFromErrors(errors, name)}
      style={{ marginTop: 0 }}
      type={fieldProps.type ? fieldProps.type : 'datetime-local'}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};

export default DateTimeInput;
