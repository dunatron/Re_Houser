import PropTypes from "prop-types";
import React from 'react';
import { IconButton, CircularProgress } from '@material-ui/core';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import { green, red } from '@material-ui/core/colors';

import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import UploadIcon from '@material-ui/icons/CloudUploadOutlined';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  tickIcon: {
    color: green[500],
  },
  closeIcon: {
    color: red[500],
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
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

const UploadFileButton = props => {
  const { uploadCompleted } = props;
  const classes = useStyles();
  const buttonClassname = clsx({
    [classes.buttonSuccess]: uploadCompleted,
  });
  const iconToRender = () => {
    if (props.uploadCompleted)
      return <CheckIcon size="small" className={classes.tickIcon} />;
    if (props.error)
      return <CloseIcon size="small" className={classes.closeIcon} />;
    if (props.uploadCompleted === false)
      return <UploadIcon size="small" color="primary" />;
    return null;
  };
  return (
    <div className={classes.wrapper}>
      <IconButton
        size="medium"
        className={buttonClassname}
        disabled={props.loading || props.uploadCompleted}
        onClick={props.handleClick}
        color="default"
        aria-label="upload picture"
        component="span">
        {iconToRender()}
        {props.loading && (
          <CircularProgress size={47} className={classes.fabProgress} />
        )}
      </IconButton>
    </div>
  );
};

UploadFileButton.propTypes = {
  error: PropTypes.any.isRequired,
  handleClick: PropTypes.any.isRequired,
  loading: PropTypes.any.isRequired,
  uploadCompleted: PropTypes.bool.isRequired
}

export default UploadFileButton;
