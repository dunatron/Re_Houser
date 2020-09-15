import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Typography, TextField } from '@material-ui/core';

const StyledInput = withStyles({
  root: {
    marginBottom: '16px',
    marginRight: '16px',
  },
  formControl: {},
})(TextField);

export default StyledInput;
