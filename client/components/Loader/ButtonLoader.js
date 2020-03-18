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
    // margin: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: '100%',
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
    // color: green[500],
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
    // color: theme.palette.getContrastText(purple[500]),
    // backgroundColor: purple[500],
    // '&:hover': {
    //   backgroundColor: purple[700],
    // },
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

const ButtonLoader = ({
  loading,
  success,
  onClick,
  text,
  successText,
  cy,
  btnProps,
}) => {
  const classes = useStyles();
  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
    button: true,
  });

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <StyledButton
          data-cy={cy}
          // fullWidth
          variant="contained"
          color="primary"
          className={buttonClassname}
          disabled={loading}
          {...btnProps}
          onClick={onClick}>
          <RenderBtnText
            success={success}
            text={text}
            successText={successText}
          />
        </StyledButton>
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
