import PropTypes from 'prop-types';
import React from 'react';
import { isEmpty } from 'ramda';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Button, Paper, Typography } from '@material-ui/core';
import { green, purple, red } from '@material-ui/core/colors';

const ErrorPaper = withStyles(theme => ({
  root: {
    padding: theme.spacing(1),
    backgroundColor: red[100],
    borderRadius: 0,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}))(Paper);

const useStyles = makeStyles(theme => ({
  header: {
    color: red[900],
  },
  errorKey: {
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
  const classes = useStyles();
  if (isEmpty(errors)) return null;
  return (
    <ErrorPaper>
      <Typography variant="h6" className={classes.header}>
        There were errors with the form
      </Typography>
      <hr />
      <FormErrorEntries errors={errors} />
    </ErrorPaper>
  );
};

const FormErrorEntries = ({ errors }) => {
  return Object.entries(errors).map((err, idx) => {
    return <RenderError err={err} />;
  });
};

const RenderError = ({ err }) => {
  const classes = useStyles();
  if (typeof err === 'object' && !err[1].message) {
    return <FormErrorEntries errors={err[1]} />;
  }
  return (
    <>
      <Typography className={classes.errorKey} variant="body1">
        {err[0]}:
        <Typography className={classes.errorMessage} variant="body2">
          {err[1].type}: {err[1].message}
        </Typography>
      </Typography>
      <p></p>
    </>
  );
};

FormErrors.propTypes = {
  errors: PropTypes.any,
};

export default FormErrors;
