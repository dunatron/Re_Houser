import { isEmpty } from 'ramda';
import {
  createMuiTheme,
  withStyles,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles';
import { Button, Paper, Typography } from '@material-ui/core';
import { green, purple, red } from '@material-ui/core/colors';

const ErrorPaper = withStyles(theme => ({
  root: {
    // color: theme.palette.getContrastText(purple[500]),
    padding: theme.spacing(1),
    backgroundColor: red[100],
    borderRadius: 0,
  },
}))(Paper);

const useStyles = makeStyles(theme => ({
  header: {
    color: red[900],
  },
  errorKey: {
    // backgroundColor: green[500],
    // '&:hover': {
    //   backgroundColor: green[700],
    // },
    color: red[900],
    fontWeight: '900',
  },
  errorMessage: {
    fontWeight: '300',
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

const FormErrors = ({ errors }) => {
  if (isEmpty(errors)) return null;
  const classes = useStyles();

  const formErrors = Object.entries(errors).map((err, idx) => {
    console.log('AN err entry?? ', err);
    return (
      <>
        <Typography className={classes.errorKey}>
          {err[0]} =>{' '}
          <span className={classes.errorMessage}>
            {err[1].type}: {err[1].message}
          </span>
        </Typography>
        <p></p>
      </>
    );
  });
  return (
    <ErrorPaper>
      <Typography variant="h6" className={classes.header}>
        There were errors with the form
      </Typography>
      <hr />
      {formErrors}
    </ErrorPaper>
  );
};

export default FormErrors;