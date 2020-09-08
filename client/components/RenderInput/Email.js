import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Typography, TextField } from '@material-ui/core';

import StyledInput from './StyledInput';

const useStyles = makeStyles(theme => ({
  root: {
    fontSize: '32px',
  },
}));

const EmailInput = ({ fieldProps, defaultValue, onChange }) => {
  const classes = useStyles();

  const handleOnChange = e => onChange(e.target.value);

  return (
    <StyledInput
      label={fieldProps.label}
      name={fieldProps.name}
      defaultValue={defaultValue}
      helperText={fieldProps.helperText}
      onChange={handleOnChange}
    />
  );
};

export default EmailInput;
