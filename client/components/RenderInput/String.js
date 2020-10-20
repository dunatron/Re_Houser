import PropTypes from "prop-types";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Typography, TextField } from '@material-ui/core';

import StyledInput from './StyledInput';

const useStyles = makeStyles(theme => ({
  root: {
    fontSize: '32px',
  },
}));

const StringInput = ({ fieldProps, defaultValue, onChange }) => {
  const classes = useStyles();
  const handleOnChange = e => onChange(e.target.value);

  return (
    <StyledInput
      label={fieldProps.label}
      name={fieldProps.name}
      defaultValue={defaultValue}
      helperText={fieldProps.helperText}
      {...fieldProps}
      onChange={handleOnChange}
    />
  );
};

StringInput.propTypes = {
  defaultValue: PropTypes.any,
  fieldProps: PropTypes.shape({
    helperText: PropTypes.any,
    label: PropTypes.any,
    name: PropTypes.any
  }).isRequired,
  onChange: PropTypes.func.isRequired
}

export default StringInput;
