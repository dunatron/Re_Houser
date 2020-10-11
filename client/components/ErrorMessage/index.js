import styled from 'styled-components';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '0 1rem',
    background: theme.palette.background.paper,
    margin: theme.spacing(2),
    border: '1px solid rgba(0, 0, 0, .05)',
    borderLeft: '5px solid red',
  },
}));

const DisplayError = ({ error, tronM }) => {
  const classes = useStyles();
  if (!error || !error.message) return null;
  // 2 tiers. first is if it is a neqtworkError and results
  // TIER 1
  if (
    error.networkError &&
    error.networkError.result &&
    error.networkError.result.errors.length
  ) {
    return error.networkError.result.errors.map((err, i) => (
      <>
        {tronM && (
          <p>
            THIS ULTIMATELY FAILED BECAUSE YOU TRIED TO BLA BLA... standardize
            with ovveride {tronM}
          </p>
        )}
        <Paper className={classes.root} key={i}>
          <>
            {tronM && <p>{tronM}</p>}
            <p data-test="graphql-error">
              <strong>Shoot!</strong>
              <br />
              {err.message.replace('GraphQL error: ', '')}
            </p>
          </>
        </Paper>
      </>
    ));
  }

  return (
    <Paper className={classes.root}>
      <>
        {tronM && <p>{tronM}</p>}
        <p data-test="graphql-error">
          <strong>Shoot!</strong>
          <br />
          {error.message.replace('GraphQL error: ', '')}
        </p>
      </>
    </Paper>
  );
};

DisplayError.defaultProps = {
  error: {},
};

DisplayError.propTypes = {
  error: PropTypes.object.isRequired,
  tronM: PropTypes.any,
};

export default DisplayError;
