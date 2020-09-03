import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, Typography } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  container: {
    padding: '12px',
    display: 'flex',
    alignItems: 'center',
  },
  loader: {},
  text: {
    padding: '8px',
  },
  containerFullScreen: {
    height: '100vh',
    justifyContent: 'center',
    padding: theme.spacing(4),
    flexDirection: 'column',
    textAlign: 'center',
  },
  loaderFullScreen: {},
  textFullScreen: {
    fontSize: '2rem',
  },
}));

const Loader = props => {
  const { color, text, fullScreen } = props;
  const classes = useStyles();

  const containerClasses = clsx(
    classes.container,
    fullScreen && classes.containerFullScreen
  );

  const loaderClasses = clsx(
    classes.loader,
    fullScreen && classes.loaderFullScreen
  );

  const textClasses = clsx(classes.text, fullScreen && classes.textFullScreen);

  return (
    <div className={containerClasses}>
      <div>
        <CircularProgress
          className={loaderClasses}
          color={color ? color : 'primary'}
        />
      </div>
      {text && (
        <Typography color="secondary" className={textClasses}>
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
