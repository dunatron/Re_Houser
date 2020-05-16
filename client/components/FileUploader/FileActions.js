import React, { useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Paper, Button, IconButton, CircularProgress } from '@material-ui/core';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import { green, red } from '@material-ui/core/colors';

import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import UploadIcon from '@material-ui/icons/CloudUploadOutlined';
import TrashIcon from '@material-ui/icons/DeleteOutlined';
import DeleteForeverIcon from '@material-ui/icons/DeleteForeverOutlined';
import ViewIcon from '@material-ui/icons/VisibilityOutlined';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3px',
    paddingRight: '8px',
    paddingTop: '8px',
    [theme.breakpoints.up('sm')]: {
      paddingTop: '3px',
    },
  },
  wrapper: {
    // margin: theme.spacing(1),
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

const FileActions = ({ file, remove, upload, deleteForever }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <UploadFileButton
        file={file}
        loading={file.loading}
        error={file.error}
        uploadCompleted={file.uploadCompleted}
        handleClick={() => upload(file)}
      />
      <IconButton
        size="medium"
        disabled={file.loading}
        onClick={() =>
          alert('Todo: create modal to handle viewing differnet file types')
        }
        color="default"
        aria-label="upload picture"
        component="span">
        <ViewIcon size="small" />
      </IconButton>
      {file.uploadCompleted ? (
        <IconButton
          size="medium"
          disabled={file.loading}
          onClick={() => deleteForever(file)}
          color="default"
          aria-label="upload picture"
          component="span">
          <DeleteForeverIcon size="small" />
        </IconButton>
      ) : (
        <IconButton
          size="medium"
          disabled={file.loading}
          onClick={() => remove(file)}
          color="default"
          aria-label="upload picture"
          component="span">
          <TrashIcon size="small" />
        </IconButton>
      )}
    </div>
  );
};

export default FileActions;
