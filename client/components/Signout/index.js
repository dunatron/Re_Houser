import React, { Component } from 'react';
import { useQuery } from '@apollo/client';
import { Mutation } from 'react-apollo';
import { useMutation, useApolloClient } from '@apollo/client';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from '../User/index';
import NavButton from '../../styles/NavButton';
import Error from '../ErrorMessage/index';
import { toast } from 'react-toastify';

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`;

/**
 *
 * NOTE: it breaks if we try to update the user in the cache. because of the setup you kind of need to refetch the queries..
 *
 */
const Signout = ({ label, fullWidth, me }) => {
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
        disabled={loading}
        data-cy="account-logout">
        {label ? label : 'Sign Out'}
      </NavButton>
    </>
  );
};
export default Signout;
