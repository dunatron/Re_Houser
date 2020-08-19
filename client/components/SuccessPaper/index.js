import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Button, Typography } from '@material-ui/core';
import {
  deepOrange,
  deepPurple,
  blueGrey,
  lightGreen,
  green,
  lightBlue,
  red,
} from '@material-ui/core/colors';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    maxWidth: '920px',
  },
  checkIcon: {
    color: theme.palette.secondary.contrastText,
    marginRight: theme.spacing(2),
    marginTop: '6px',
  },
  messageStrip: {
    display: 'flex',
  },
  children: {
    color: theme.palette.secondary.contrastText,
  },
  button: {
    color: theme.palette.secondary.contrastText,
    marginTop: theme.spacing(2),
  },
}));

const SuccessPaper = ({ children, handleCreateMore, show }) => {
  const classes = useStyles();

  if (!show) return null;

  return (
    <Paper variant="outlined" square className={classes.root}>
      <div className={classes.messageStrip}>
        <CheckCircleOutlineIcon className={classes.checkIcon} />
        <Typography className={classes.children} variant="subtitle1">
          {children}
        </Typography>
      </div>
      <Button onClick={handleCreateMore} className={classes.button}>
        Create More
      </Button>
    </Paper>
  );
};

export default SuccessPaper;
