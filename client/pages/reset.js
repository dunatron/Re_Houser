import { useState } from 'react';
import gql from 'graphql-tag';
import PageHeader from '../components/PageHeader';
import { useMutation } from '@apollo/client';
import FormCreator from '../components/Forms/FormCreator';
import RESET_PASSWORD_FORM_CONF from '../lib/configs/resetPasswordForm';
import { CURRENT_USER_QUERY } from '../graphql/queries/currentUser';
import Signout from '../components/Signout';
import { Typography } from '@material-ui/core';
import SuperLogin from '../components/SuperLogin';

const RESET_PASSWORD_MUTATION = gql`
  mutation resetPassword(
    $resetToken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      resetToken: $resetToken
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
    }
  }
`;

const ResetPage = props => {
  const {
    appData: { currentUser },
    query,
  } = props;

  if (!query.resetToken) {
    return 'There is no reset token attached, perhaps go to request reset..?';
  }

  if (currentUser.data && currentUser.data.me) {
    return <SuperLogin />;
    return (
      <>
        <Typography>
          Signed in as {currentUser.data.me.firstName}{' '}
          {currentUser.data.me.lastName}
        </Typography>
        <Signout
          label="Signout"
          fullWidth={true}
          me={currentUser.data.me}
          color="primary"
          variant="contained"
        />
      </>
    );
  }

  console.log('WHat props do we have here => ', props);

  const handleOnCompleted = () => {};

  const [resetPassword, { loading, error, data }] = useMutation(
    RESET_PASSWORD_MUTATION,
    {
      onCompleted: handleOnCompleted,
      refetchQueries: [
        {
          query: CURRENT_USER_QUERY,
        },
      ],
    }
  );

  const handleFormSubmit = data => {
    resetPassword({
      //   ...data,
      variables: {
        ...data,
        resetToken: query.resetToken,
      },
    });
  };

  //resetPassword mutation, takes data.password && data.confirmPassword

  //   title,
  //     data,
  //     config,
  //     isNew,
  //     posting,
  //     error,
  //     fileRemovedFromServer,
  //     updateCacheOnRemovedFile,
  //     forceFormUpdates,
  //     createText,
  //     updateText,
  return (
    <>
      <PageHeader
        title="Reset Password"
        intro="If you have requested a reset"
        metaData={{
          title: 'Reset user password',
          content: 'Reset user password',
        }}
      />
      <FormCreator
        title="reset password form"
        error={error}
        posting={loading}
        isNew={true}
        createText="reset password"
        config={RESET_PASSWORD_FORM_CONF}
        onSubmit={handleFormSubmit}
      />
    </>
  );
};

export default ResetPage;
