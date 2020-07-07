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

  console.log('default value for a date input => ', defaultValue);

  const defaultRFCIsoValue = defaultValue
    ? moment(defaultValue).format('YYYY-MM-DDTkk:mm')
    : moment().format('YYYY-MM-DDTkk:mm');

  return (
    <StyledInput
      //   type={'date'}
      type={fieldProps.type ? fieldProps.type : 'datetime-local'}
      className={classes.root}
      fullWidth={true}
      label={fieldProps.label}
      name={fieldProps.name}
      defaultValue={defaultRFCIsoValue}
      helperText={fieldProps.helperText}
      onChange={handleOnChange}
    />
  );
};

export default DateTimeInput;
