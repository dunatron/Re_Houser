import PropTypes from 'prop-types';
import OwnerProperties from '@/Components/OwnerProperties/index';
import PleaseSignIn from '@/Components/PleaseSignIn';
import PageHeader from '@/Components/PageHeader';
import { Typography } from '@material-ui/core';

// server side props
import { initializeApollo, addApolloState } from '@/Lib/apolloClient';
import { CURRENT_USER_QUERY } from '@/Gql/queries';
import { OWNER_PROPERTIES_QUERY } from '@/Gql/queries';

const PropertiesPage = props => {
  const {
    appData: { currentUser },
  } = props;
  console.log('props on Properties Page page => ', props);
  const pleaseSignInMessage =
    'You must be signed in to manager your properties';

  const me = currentUser.data ? currentUser.data.me : null;
  return (
    <>
      <PageHeader
        title="My Properties"
        intro="Here is the portal to your properties, you can get a quick overview etc etc and add a property with the add property button"
        children={[
          <Typography key={1} gutterBottom>
            Maybe something else to say
          </Typography>,
        ]}
        metaData={{
          title: 'My Properties',
          content: 'The properties for the current logged in user',
        }}
      />
      <PleaseSignIn
        message={pleaseSignInMessage}
        alert={
          <Typography variant="body1" gutterBottom color="inherit">
            <Typography component="strong">{pleaseSignInMessage}</Typography>
          </Typography>
        }>
        <OwnerProperties me={me} />
      </PleaseSignIn>
    </>
  );
};

export async function getServerSideProps(ctx) {
  const apolloClient = initializeApollo(null, ctx);

  try {
    await apolloClient.query({
      query: CURRENT_USER_QUERY,
    });
    await apolloClient.query({
      query: OWNER_PROPERTIES_QUERY,
    });
  } catch (e) {}

  return addApolloState(apolloClient, {
    props: {},
  });
}

PropertiesPage.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object.isRequired,
  }),
};

export default PropertiesPage;
