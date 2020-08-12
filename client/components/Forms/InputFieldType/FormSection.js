import { Paper, Typography } from '@material-ui/core';
import InputFieldType from './index';

const FormSection = props => {
  const {
    register,
    config,
    errors,
    errorMessage,
    setValue,
    reset,
    defaultValue,
  } = props;
  const { type, inners, fieldProps, refConf } = config;
  const { name, label } = fieldProps;
  const { options } = fieldProps;
  return (
    <Paper style={{ padding: '8px' }}>
      {label && (
        <Typography variant="h6" gutterBottom color="primary">
          {label}
        </Typography>
      )}
      {inners &&
        inners.map((inner, idx) => {
          return (
            <InputFieldType
              {...props}
              config={inner}
              key={idx}
              register={register}
              errors={errors}
            />
          );
        })}
    </Paper>
  );
};

export default FormSection;
