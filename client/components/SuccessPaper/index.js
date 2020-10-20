import PropTypes from 'prop-types';
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
      <Button
        onClick={handleCreateMore}
        className={classes.button}
        variant="contained"
        color="default">
        Create More
      </Button>
    </Paper>
  );
};

SuccessPaper.propTypes = {
  children: PropTypes.any,
  handleCreateMore: PropTypes.any,
  show: PropTypes.any
};

export default SuccessPaper;
