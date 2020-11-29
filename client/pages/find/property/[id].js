import PropTypes from 'prop-types';
import PleaseSignIn from '@/Components/PleaseSignIn';
import ConfirmEmail from '@/Components/ConfirmEmail';
import PageHeader from '@/Components/PageHeader';
import { Typography } from '@material-ui/core';

// server side props
import { initializeApollo, addApolloState } from '@/Lib/apolloClient';
import { CURRENT_USER_QUERY } from '@/Gql/queries';

const FindPropertyPage = ({ appData: { currentUser } }) => {
  const pleaseSignInMessage =
    'You must be signed in to manager your properties';
  const me = currentUser.data ? currentUser.data.me : null;
  return (
    <>
      <PageHeader
        title="Find Property"
        intro="Find Properties"
        metaData={{
          title: 'Find Property',
          content: 'Find Property in the system',
        }}
      />
      <PleaseSignIn
        currentUser={currentUser}
        message={pleaseSignInMessage}
        alert={
          <Typography component="p" gutterBottom color="inherit">
            <Typography component="strong">{pleaseSignInMessage}</Typography>
          </Typography>
        }>
        <div>To Come. Property</div>
      </PleaseSignIn>
    </>
  );
};

FindPropertyPage.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object.isRequired,
  }),
};

export default FindPropertyPage;
