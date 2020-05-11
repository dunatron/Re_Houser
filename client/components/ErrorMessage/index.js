import styled from 'styled-components';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

import PropTypes from 'prop-types';
// const ErrorStyles = styled.div`
//   padding: 2rem;
//   background: white;
//   margin: 2rem 0;
//   border: 1px solid rgba(0, 0, 0, 0.05);
//   border-left: 5px solid red;
//   p {
//     margin: 0;
//     font-weight: 100;
//   }
//   strong {
//     margin-right: 1rem;
//   }
// `;

const useStyles = makeStyles(theme => ({
  root: {
    padding: '0 1rem',
    background: theme.palette.background.paper,
    margin: '2rem 0',
    border: '1px solid rgba(0, 0, 0, .05)',
    borderLeft: '5px solid red',
  },
}));

const DisplayError = ({ error, tronM }) => {
  const classes = useStyles();
  if (!error || !error.message) return null;
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
  error: PropTypes.object,
};

export default DisplayError;
