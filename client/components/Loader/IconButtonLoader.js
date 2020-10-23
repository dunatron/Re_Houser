import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green, purple } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';

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

const StyledIconButton = withStyles(theme => ({
  root: {
    borderRadius: 0,
  },
}))(IconButton);

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

const IconButtonLoader = props => {
  const {
    loading,
    success,
    onClick,
    cy,
    btnProps,
    children,
    style = {},
  } = props;
  const classes = useStyles();
  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
    button: true,
  });

  return (
    <StyledIconButton
      data-cy={cy}
      variant="contained"
      color="primary"
      className={buttonClassname}
      disabled={loading}
      {...btnProps}
      style={style}
      // {...props}
      onClick={onClick}>
      {children}
      {loading && (
        <CircularProgress size={24} className={classes.buttonProgress} />
      )}
    </StyledIconButton>
  );
};

IconButtonLoader.propTypes = {
  btnProps: PropTypes.any,
  children: PropTypes.any,
  cy: PropTypes.any,
  loading: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  success: PropTypes.bool,
};

export { StyledIconButton, IconButtonLoader };
export default IconButtonLoader;
