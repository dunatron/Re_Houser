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

const DateTimeInput = ({ fieldProps, defaultValue, onChange }) => {
  const classes = useStyles();
  const handleOnChange = e => onChange(e.target.value);

  const defaultRFCIsoValue = defaultValue
    ? moment(defaultValue).format('YYYY-MM-DDTkk:mm')
    : moment().format('YYYY-MM-DDTkk:mm');

  return (
    <StyledInput
      //   type={'date'}
      type={fieldProps.type ? fieldProps.type : 'datetime-local'}
      label={fieldProps.label}
      name={fieldProps.name}
      defaultValue={defaultRFCIsoValue}
      helperText={fieldProps.helperText}
      onChange={handleOnChange}
    />
  );
};

DateTimeInput.propTypes = {
  defaultValue: PropTypes.any,
  fieldProps: PropTypes.shape({
    helperText: PropTypes.any,
    label: PropTypes.any,
    name: PropTypes.any,
    type: PropTypes.any
  }).isRequired,
  onChange: PropTypes.func.isRequired
}

export default DateTimeInput;
