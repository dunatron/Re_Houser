import {
  Button,
  TextField,
  InputAdornment,
  FormControl,
  Input,
  FormHelperText,
} from '@material-ui/core';

const NumberInput = ({
  name,
  label,
  helperText,
  handleChange,
  InputProps,
  ...rest
}) => {
  const onChange = e => {
    const nextVal = parseInt(e.target.value);
    handleChange(nextVal);
  };
  return (
    <FormControl>
      <Input
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

export default NumberInput;
