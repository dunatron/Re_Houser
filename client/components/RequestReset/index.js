import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Query, Mutation, Subscription } from '@apollo/react-components';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Form from '@/Styles/Form';
import Error from '@/Components/ErrorMessage/index';
import Loader from '@/Components/Loader';
import FabButton from '@/Styles/FabButton';
import NavigationIcon from '@material-ui/icons/Navigation';
import TextInput from '@/Styles/TextInput';
import { Typography } from '@material-ui/core';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

const RequestReset = props => {
  const [email, setEmail] = useState(props.email);
  const [resetPassword, { data, loading, error, called, client }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: {
        email: email,
      },
    }
  );
  useEffect(() => {
    setEmail(props.email);
  }, [props.email]);

  return (
    <Form
      method="post"
      data-test="form"
      onSubmit={async e => {
        e.preventDefault();
        await resetPassword();
        setEmail('');
      }}>
      <fieldset
        disabled={loading}
        aria-busy={loading}
        className="main-fieldset">
        <Error error={error} />
        {!error && !loading && called && (
          <Typography gutterBottom color="secondary">
            Success! Check your email for a reset link!
          </Typography>
        )}
        {loading && <Loader loading={loading} text="Sending reset token" />}
        <TextInput
          id="email-reset"
          className="input"
          label="Email"
          fullWidth={true}
          type="email"
          name="email"
          placeholder="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <FabButton
          type="submit"
          variant="extended"
          color="primary"
          aria-label="Add"
          style={{ minWidth: 160 }}>
          <NavigationIcon style={{ marginRight: 5 }} />
          Request Reset
        </FabButton>
      </fieldset>
    </Form>
  );
};

RequestReset.propTypes = {
  email: PropTypes.any,
};

export default RequestReset;
export { REQUEST_RESET_MUTATION };
