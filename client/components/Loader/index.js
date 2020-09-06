import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, Typography } from '@material-ui/core';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    padding: '12px',
    display: 'flex',
    alignItems: 'center',
  },
  containerFullscreen: {
    height: '100vh',
    textAlign: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(4),
  },
  loader: {},
  text: {
    padding: '8px',
  },
  textFullScreen: {
    fontSize: '22px',
  },
}));

const Loader = props => {
  const { color, text, fullscreen } = props;
  const classes = useStyles();

  const containerClasses = clsx(
    classes.container,
    fullscreen && classes.containerFullscreen
  );

  const textClasses = clsx(classes.text, fullscreen && classes.textFullScreen);
  return (
    <div className={containerClasses}>
      <div>
        <CircularProgress
          className={classes.loader}
          color={color ? color : 'primary'}
        />
      </div>
      {text && (
        <Typography color="primary" className={textClasses}>
          {text}
        </Typography>
      )}
    </div>
  );
};

Loader.propTypes = {
  loading: PropTypes.bool.isRequired,
  color: PropTypes.string,
  text: PropTypes.string,
};

export default Loader;
