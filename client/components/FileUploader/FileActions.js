import PropTypes from 'prop-types';
import { IconButton, CircularProgress } from '@material-ui/core';

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
  uploadCompleted: PropTypes.bool.isRequired,
};

const FileActions = ({
  file,
  remove,
  upload,
  deleteForever,
  isRemoving,
  removingIds,
}) => {
  const classes = useStyles();
  const _isBeingActioned = () => {
    if (file.loading) return true;
    if (!removingIds) return false;
    if (removingIds.includes(file.id)) return true;
    return false;
  };
  const isBeingActioned = _isBeingActioned();
  return (
    <div className={classes.root}>
      <UploadFileButton
        file={file}
        loading={isBeingActioned}
        error={file.error}
        uploadCompleted={file.uploadCompleted}
        handleClick={() => {
          if (file.error) {
            return remove(file);
          } else {
            upload(file);
          }
        }}
      />
      <IconButton
        size="medium"
        disabled={isBeingActioned}
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
          disabled={isBeingActioned}
          onClick={() => deleteForever(file)}
          color="default"
          aria-label="upload picture"
          component="span">
          <DeleteForeverIcon size="small" />
        </IconButton>
      ) : (
        <IconButton
          size="medium"
          disabled={isBeingActioned}
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

FileActions.propTypes = {
  deleteForever: PropTypes.func.isRequired,
  file: PropTypes.shape({
    error: PropTypes.any,
    id: PropTypes.any,
    loading: PropTypes.any,
    uploadCompleted: PropTypes.any,
  }).isRequired,
  isRemoving: PropTypes.any.isRequired,
  remove: PropTypes.func.isRequired,
  removingIds: PropTypes.shape({
    includes: PropTypes.func,
  }).isRequired,
  upload: PropTypes.func.isRequired,
};

export default FileActions;
