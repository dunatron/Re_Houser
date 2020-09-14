import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import PageHeader from '@Components/PageHeader';
import { useMutation } from '@apollo/client';
import FormCreator from '@Components/Forms/FormCreator';
import RESET_PASSWORD_FORM_CONF from '@Lib/configs/resetPasswordForm';
import { CURRENT_USER_QUERY } from '@Gql/queries/currentUser';
import SuperLogin from '@Components/SuperLogin';
import { Typography } from '@material-ui/core';

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

const ResetPage = ({ appData: { currentUser }, query }) => {
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
        resetToken: query.resetToken,
      },
    });
  };

  // if logged in no need to reset
  if (me) return <SuperLogin />;

  // cant reset password if we have no valid resetToken
  if (!query.resetToken)
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

ResetPage.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object.isRequired,
  }),
  query: PropTypes.shape({
    resetToken: PropTypes.string,
  }),
};

export default ResetPage;
