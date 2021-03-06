import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
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

const RenderBtnText = ({ success, text, successText }) => {
  if (!text) {
    return <span>Button</span>;
  }
  if (success) {
    return <span>{successText ? successText : text}</span>;
  }
  return <span>{text}</span>;
};

RenderBtnText.propTypes = {
  success: PropTypes.any,
  successText: PropTypes.any,
  text: PropTypes.any,
};

const SaveButtonLoader = ({
  loading,
  success,
  onClick,
  text,
  successText,
  disabled,
  size,
}) => {
  const classes = useStyles();
  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  const _getIconSize = () => {
    if (size === 'large') return 'large';
    if (size === 'medium') return 'large';
    if (size === 'small') return 'small';
    return 'default';
  };

  const iconSize = _getIconSize();

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Fab
          size={size ? size : 'large'}
          disabled={disabled}
          aria-label="save"
          color="primary"
          className={buttonClassname}
          onClick={onClick}>
          {success ? (
            <CheckIcon fontSize={iconSize} />
          ) : (
            <SaveIcon fontSize={iconSize} />
          )}
        </Fab>
        {loading && (
          <CircularProgress size={68} className={classes.fabProgress} />
        )}
      </div>
    </div>
  );
};

SaveButtonLoader.propTypes = {
  disabled: PropTypes.any,
  loading: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  success: PropTypes.bool.isRequired,
  successText: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default SaveButtonLoader;
