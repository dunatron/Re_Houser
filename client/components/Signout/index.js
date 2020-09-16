import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { useQuery } from '@apollo/client';
import { Mutation } from 'react-apollo';
import { useMutation, useApolloClient } from '@apollo/client';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from '@/Components/User/index';
import NavButton from '@/Styles/NavButton';
import Error from '@/Components/ErrorMessage/index';
import { toast } from 'react-toastify';

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`;

const Signout = ({ label, fullWidth, me, color, variant }) => {
  const client = useApolloClient();

  const handleCompleted = data => {
    client.resetStore();
    toast.success(
      <p>
        <strong>You have logged out</strong>
      </p>
    );
  };
  const handleOnError = error => {};

  const [signout, { data, loading, error }] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
    onCompleted: handleCompleted,
    onError: handleOnError,
  });

  if (!me) return null;

  return (
    <>
      <Error error={error} />
      <NavButton
        onClick={signout}
        fullWidth={fullWidth}
        variant={variant}
        color={color}
        disabled={loading}
        data-cy="account-logout">
        {label ? label : 'Sign Out'}
      </NavButton>
    </>
  );
};

Signout.propTypes = {
  color: PropTypes.any.isRequired,
  fullWidth: PropTypes.any.isRequired,
  label: PropTypes.any.isRequired,
  me: PropTypes.any.isRequired,
  variant: PropTypes.any.isRequired
};
export default Signout;
