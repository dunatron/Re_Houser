import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Typography, TextField } from '@material-ui/core';

const StyledInput = withStyles({
  root: {},
  formControl: {},
  label: {
    textTransform: 'uppercase',
    fontSize: '18px',
  },
  textField: {
    fontSize: '32px',
  },
})(TextField);

export default StyledInput;
