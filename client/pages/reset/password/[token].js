import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import PageHeader from '@/Components/PageHeader';
import { useMutation } from '@apollo/client';
import FormCreator from '@/Components/Forms/FormCreator';
import RESET_PASSWORD_FORM_CONF from '@/Lib/configs/resetPasswordForm';
import SuperLogin from '@/Components/SuperLogin';
import { Typography } from '@material-ui/core';

// server side props
import { initializeApollo, addApolloState } from '@/Lib/apolloClient';
import { CURRENT_USER_QUERY } from '@/Gql/queries';

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

const ResetPasswordPage = ({ appData: { currentUser }, query: { token } }) => {
  const me = currentUser.data ? currentUser.data.me : null;

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
      variables: {
        ...data,
        resetToken: token,
      },
    });
  };

  // if logged in no need to reset
  if (me) return <SuperLogin />;

  // cant reset password if we have no valid resetToken
  if (!token)
    return (
      <Typography variant="body1" color="error">
        There is no reset token attached, perhaps go to request reset..?
      </Typography>
    );

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
        data={{
          token: token,
        }}
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

export async function getServerSideProps(ctx) {
  const apolloClient = initializeApollo(null, ctx);
  await apolloClient.query({
    query: CURRENT_USER_QUERY,
  });
  return addApolloState(apolloClient, {
    props: {
      query: ctx.query,
    },
  });
}

ResetPasswordPage.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object.isRequired,
  }),
};

export default ResetPasswordPage;
