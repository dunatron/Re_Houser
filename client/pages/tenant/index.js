import PropTypes from 'prop-types';
import PleaseSignIn from '../../components/PleaseSignIn';
import PageHeader from '../../components/PageHeader';
import { Typography } from '@material-ui/core';
import Dashboard from '../../components/Dashboard';
import TENANT_DASHBOARD_CONFIG from '../../lib/configs/tenantDashboardConfig';

const TenantPage = ({ appData: { currentUser } }) => {
  const pleaseSignInMessage =
    'You must be signed in to the system to do tenant activities';
  return (
    <>
      <PageHeader
        title="Tenant Portal"
        intro="Welcome to the Tenant Portal. From here you can manage your applications and your lease"
        children={[]}
        metaData={{
          title: 'Tenant Portal',
          content: 'Tenant portal for the current logged in user',
        }}
      />
      <PleaseSignIn
        currentUser={currentUser}
        message={pleaseSignInMessage}
        alert={
          <Typography variant="body1">
            <strong>{pleaseSignInMessage}</strong>
          </Typography>
        }>
        <Dashboard
          config={TENANT_DASHBOARD_CONFIG}
          elevation={10}
          heading="Tenant Portal"
          intro="Here is the tenant portal dashboard"
        />
      </PleaseSignIn>
    </>
  );
};

TenantPage.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object.isRequired,
  }),
};

export default TenantPage;
