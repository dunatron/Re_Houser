import PropTypes from 'prop-types';
import {
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
} from '@material-ui/core';
import { withStyles } from '@material-ui//core/styles';

const styles = theme => ({
  formControl: {
    minWidth: '220px',
    marginBottom: theme.spacing(2),
  },
});

const NumberInput = ({
  name,
  label,
  helperText,
  handleChange,
  InputProps,
  classes,
  ...rest
}) => {
  const onChange = e => {
    const nextVal = parseInt(e.target.value);
    handleChange(nextVal);
  };
  return (
    <FormControl className={classes.formControl} fullWidth>
      <InputLabel htmlFor={`number-input-${name}`}>{label}</InputLabel>
      <Input
        id={`number-input-${name}`}
        type="number"
        inputProps={InputProps ? InputProps.inputProps : {}}
        onChange={onChange}
        {...rest}
        aria-describedby={`${name}-number-helper-text`}
      />
      <FormHelperText id={`${name}-number-helper-text`}>
        {helperText}
      </FormHelperText>
    </FormControl>
  );
};

NumberInput.propTypes = {
  InputProps: PropTypes.shape({
    inputProps: PropTypes.any
  }).isRequired,
  classes: PropTypes.shape({
    formControl: PropTypes.any
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  helperText: PropTypes.any,
  label: PropTypes.any,
  name: PropTypes.any
};

export default withStyles(styles)(NumberInput);
