import OwnerProperties from '../../components/OwnerProperties/index';
import PleaseSignIn from '../../components/PleaseSignIn';
import PageHeader from '../../components/PageHeader';
import { Typography } from '@material-ui/core';
import Dashboard from '../../components/Dashboard';
import LANDLORD_DASHBOARD_CONFIG from '../../lib/configs/landlordDashboardConfig';

const LandlordPage = props => {
  const {
    appData: { currentUser },
  } = props;
  const pleaseSignInMessage =
    'You must be signed in to manager your properties';
  return (
    <>
      <PageHeader
        title="My Properties"
        intro="Here is the portal to your properties, you can get a quick overview etc etc and add a property with the add property button"
        children={[<Typography>Maybe something else to say</Typography>]}
        metaData={{
          title: 'My Properties',
          content: 'The properties for the current logged in user',
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
          config={LANDLORD_DASHBOARD_CONFIG}
          elevation={10}
          heading="Tenant Portal"
          intro="Here is the tenant portal dashboard"
        />
      </PleaseSignIn>
    </>
  );
};

export default LandlordPage;
