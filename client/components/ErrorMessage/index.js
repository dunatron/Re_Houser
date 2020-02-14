import styled from 'styled-components';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

import PropTypes from 'prop-types';
const ErrorStyles = styled.div`
  padding: 2rem;
  background: white;
  margin: 2rem 0;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-left: 5px solid red;
  p {
    margin: 0;
    font-weight: 100;
  }
  strong {
    margin-right: 1rem;
  }
`;

const DisplayError = ({ error, tronM }) => {
  if (!error || !error.message) return null;
  console.log('==ERROR COMPONENT CALLED==');
  console.log('==ERROR COMPONENT Message => ', error.message);

  if (
    error.networkError &&
    error.networkError.result &&
    error.networkError.result.errors.length
  ) {
    error.networkError.result.errors.map((errorForToast, i) =>
      toast.error(
        <p data-test="graphql-error">
          <strong>Shoot! network Err</strong>
          <br />
          {/* <button onClick={() => notify()}>Ima need more than that</button> */}
          {errorForToast.message}
          {error.message.replace('GraphQL error: ', '')}
        </p>
      )
    );

    // useEffect(() => {
    //   // maybe put above error toasts inside this useEffect
    //   console.log('Use effect 1');
    // }, [error.networkError.result.errors]);
    useEffect(() => {
      // maybe put above error toasts inside this useEffect
      console.log('Use effect 1');
    }, [error.networkError.result.errors]);
    return error.networkError.result.errors.map((error, i) => (
      <>
        {tronM && (
          <p>
            THIS ULTIMATELY FAILED BECAUSE YOU TRIED TO BLA BLA... standardize
            with ovveride => {tronM}
          </p>
        )}
        <ErrorStyles key={i}>
          <p data-test="graphql-error">
            <strong>Shoot!</strong>
            {error.message.replace('GraphQL error: ', '')}
          </p>
        </ErrorStyles>
      </>
    ));
  }
  useEffect(() => {
    console.log('Use effect 2');
    toast.error(
      <p data-test="graphql-error">
        <strong>Shoot! </strong>
        <br />
        {/* <button onClick={() => notify()}>Ima need more than that</button> */}
        {error.message.replace('GraphQL error: ', '')}
      </p>
    );
  }, [error.message]);

  return (
    <ErrorStyles>
      <>
        {tronM && <p>{tronM}</p>}
        <p data-test="graphql-error">
          <strong>Shoot!</strong>
          <br />
          {error.message.replace('GraphQL error: ', '')}
        </p>
      </>
    </ErrorStyles>
  );
};

DisplayError.defaultProps = {
  error: {},
};

DisplayError.propTypes = {
  error: PropTypes.object,
};

export default DisplayError;
