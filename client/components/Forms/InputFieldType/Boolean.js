const Boolean = props => {
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
    <>
      <FormControlLabel
        control={<Switch {...props} aria-label="LoginSwitch" />}
        label={props.label ? props.label : fieldProps.label}
      />
      {config.inners &&
        config.inners.map((inner, idx) => (
          <InputFieldType
            config={inner}
            key={idx}
            setValue={setValue}
            register={register}
            errors={errors}
          />
        ))}
    </>
  );
};

export default Boolean;
