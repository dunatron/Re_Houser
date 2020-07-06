const AcceptTerms = props => {
  return (
    <>
      <div
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
      </div>
      <FieldError errors={errors} name={name} />
    </>
  );
};

export default AcceptTerms;
