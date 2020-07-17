import OwnerProperties from '../../components/OwnerProperties/index';
import PleaseSignIn from '../../components/PleaseSignIn';
import PageHeader from '../../components/PageHeader';
import { Typography } from '@material-ui/core';
import Dashboard from '../../components/Dashboard';
import TENANT_DASHBOARD_CONFIG from '../../lib/configs/tenantDashboardConfig';

const TenantPage = props => {
  const {
    appData: { currentUser },
  } = props;
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
          <p>
            <strong>{pleaseSignInMessage}</strong>
          </p>
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

export default TenantPage;
