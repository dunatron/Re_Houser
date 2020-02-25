import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, Typography } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

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
}));

const Loader = props => {
  const { color, text } = props;
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <CircularProgress
        className={classes.loader}
        color={color ? color : 'primary'}
      />
      {text && (
        <Typography color="primary" className={classes.text}>
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
