import PropTypes from 'prop-types';
import PleaseSignIn from '@/Components/PleaseSignIn';
import PageHeader from '@/Components/PageHeader';
import { Typography } from '@material-ui/core';
import Dashboard from '@/Components/Dashboard';
import TENANT_DASHBOARD_CONFIG from '@/Lib/configs/tenantDashboardConfig';

// server side props
import { initializeApollo, addApolloState } from '@/Lib/apolloClient';
import { CURRENT_USER_QUERY } from '@/Gql/queries';

const TenantPage = ({ appData: { currentUser } }) => {
  const pleaseSignInMessage =
    'You must be signed in to the system to do tenant activities';
  return (
    <>
      <PageHeader
        title="Tenant Portal"
        intro="Welcome to the Tenant Portal. From here you can manage your applications and your lease"
        children={[]}
        metaKeywords="Rentals, Property, Tenant, Rent Property, House"
        metaData={{
          title: 'Tenant Portal',
          content: 'Tenant portal for the current logged in user',
        }}
      />
      <PleaseSignIn
        currentUser={currentUser}
        message={pleaseSignInMessage}
        alert={
          <Typography variant="body1" gutterBottom color="inherit">
            <strong>{pleaseSignInMessage}</strong>
          </Typography>
        }>
        <Dashboard
          config={TENANT_DASHBOARD_CONFIG}
          elevation={10}
          heading="Tenant Dashboard"
          intro="Here is the tenant portal dashboard"
        />
      </PleaseSignIn>
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

TenantPage.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object.isRequired,
  }),
};

export default TenantPage;
