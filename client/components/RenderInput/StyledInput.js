import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Typography, TextField } from '@material-ui/core';

const StyledInput = withStyles({
  root: {
    marginBottom: '16px',
    marginRight: '16px',
  },
  formControl: {},
  // label: {
  //   textTransform: 'uppercase',
  //   fontSize: '18px',
  // },
  // textField: {
  //   fontSize: '32px',
  // },
})(TextField);

export default StyledInput;
