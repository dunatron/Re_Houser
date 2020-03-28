const FieldError = ({ errors, name }) => {
  const fieldHasError = errors[name];
  if (!fieldHasError) return null;
  return (
    <p style={{ color: 'red' }}>
      {fieldHasError ? errors[name].message : null}
    </p>
  );
};

export default FieldError;
