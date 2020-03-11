import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';

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
  buttonProgress: {
    // color: green[500],
    color: theme.palette.primary.main,
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

const ButtonLoader = ({ loading, success, onClick, text, successText, cy }) => {
  const classes = useStyles();
  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Button
          data-cy={cy}
          variant="contained"
          color="primary"
          className={buttonClassname}
          disabled={loading}
          onClick={onClick}>
          <RenderBtnText
            success={success}
            text={text}
            successText={successText}
          />
        </Button>
        {loading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </div>
    </div>
  );
};

ButtonLoader.propTypes = {
  loading: PropTypes.bool,
  success: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  successText: PropTypes.string,
};

export default ButtonLoader;
