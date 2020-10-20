import PropTypes from "prop-types";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Typography, TextField } from '@material-ui/core';
import moment from 'moment';

import StyledInput from './StyledInput';

const useStyles = makeStyles(theme => ({
  root: {
    fontSize: '32px',
  },
}));

const DateInput = ({ fieldProps, defaultValue, onChange }) => {
  const classes = useStyles();
  const handleOnChange = e => onChange(e.target.value);

  const defaultRFCIsoValue = defaultValue
    ? moment(defaultValue).format('YYYY-MM-DD')
    : moment().format('YYYY-MM-DD');

  return (
    <StyledInput
      type={'date'}
      // type={fieldProps.type ? fieldProps.type : 'datetime-local'}
      label={fieldProps.label}
      name={fieldProps.name}
      defaultValue={defaultRFCIsoValue}
      helperText={fieldProps.helperText}
      onChange={handleOnChange}
    />
  );
};

DateInput.propTypes = {
  defaultValue: PropTypes.any,
  fieldProps: PropTypes.shape({
    helperText: PropTypes.any,
    label: PropTypes.any,
    name: PropTypes.any
  }).isRequired,
  onChange: PropTypes.func.isRequired
}

export default DateInput;
