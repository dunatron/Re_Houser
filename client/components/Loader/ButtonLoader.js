import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green, purple } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    marginBottom: theme.spacing(1),
    position: 'relative',
  },
  button: {
    borderRadius: 0,
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  buttonProgress: {
    color: theme.palette.primary.main,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

const StyledButton = withStyles(theme => ({
  root: {
    borderRadius: 0,
  },
}))(Button);

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

const ButtonLoader = props => {
  const {
    loading,
    success,
    onClick,
    text,
    successText,
    cy,
    btnProps,
    children,
    type,
  } = props;
  const classes = useStyles();
  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
    button: true,
  });

  const handleOnClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <StyledButton
      type={type}
      data-cy={cy}
      variant="contained"
      color="primary"
      className={buttonClassname}
      disabled={loading}
      onClick={handleOnClick}
      {...btnProps}>
      {children}
      <RenderBtnText success={success} text={text} successText={successText} />
      {loading && (
        <CircularProgress size={24} className={classes.buttonProgress} />
      )}
    </StyledButton>
  );
};

ButtonLoader.propTypes = {
  btnProps: PropTypes.any,
  children: PropTypes.any,
  cy: PropTypes.any,
  loading: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  success: PropTypes.bool.isRequired,
  successText: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export { StyledButton, ButtonLoader };
export default ButtonLoader;
