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
  error.networkError.result.errors.map((err, i) =>
    toast.error(
      <p data-test="graphql-error">
        <strong>Shoot!</strong>
        <br />
        {err.message.replace('GraphQL error: ', '')}
      </p>
    )
  );
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

// import styled from 'styled-components';
// import React from 'react';
// import { toast } from 'react-toastify';

// import PropTypes from 'prop-types';
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

// const DisplayError = ({ error, tronM }) => {
//   /** custon test begin */
//   /** custon test begin */
//   if (!error || !error.message) return null;
//   // if (error) {
//   //   toast("I said so ho")
//   // }
//   if (
//     error.networkError &&
//     error.networkError.result &&
//     error.networkError.result.errors.length
//   ) {
//     error.networkError.result.errors.map((errorForToast, i) =>
//       toast(
//         <ErrorStyles key={i}>
//           <p data-test="graphql-error">
//             <strong>Shoot! network Err</strong>
//             {/* <button onClick={() => notify()}>Ima need more than that</button> */}
//             {error.message.replace('GraphQL error: ', '')}
//           </p>
//         </ErrorStyles>
//       )
//     );
//     return error.networkError.result.errors.map((error, i) => (
//       <>
//         {tronM && (
//           <p>
//             THIS ULTIMATELY FAILED BECAUSE YOU TRIED TO BLA BLA... standardize
//             with ovveride {tronM}
//           </p>
//         )}
//         <ErrorStyles key={i}>
//           <p data-test="graphql-error">
//             <strong>Shoot!</strong>
//             {/* <button onClick={() => notify()}>Ima need more than that</button> */}
//             {error.message.replace('GraphQL error: ', '')}
//           </p>
//         </ErrorStyles>
//       </>
//     ));
//   }
//   // error.networkError.result.errors.map((errorForToast, i) =>
//   //   toast(
//   //     <ErrorStyles key={i}>
//   //       <p data-test="graphql-error">
//   //         <strong>Shoot! network Err</strong>
//   //         {/* <button onClick={() => notify()}>Ima need more than that</button> */}
//   //         {error.message.replace('GraphQL error: ', '')}
//   //       </p>
//   //     </ErrorStyles>
//   //   )
//   // );
//   return (
//     <ErrorStyles>
//       <>
//         {tronM && <p>{tronM}</p>}
//         <p data-test="graphql-error">
//           <strong>Shoot!</strong>
//           {error.message.replace('GraphQL error: ', '')}
//         </p>
//       </>
//     </ErrorStyles>
//   );
// };

// DisplayError.defaultProps = {
//   error: {},
// };

// DisplayError.propTypes = {
//   error: PropTypes.object,
// };

// export default DisplayError;
