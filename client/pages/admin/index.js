// import PropertyDetails from "../../components/PropertyDetails/index"
import LeasesList from '../../components/LeasesList';
import PleaseSignIn from '../../components/PleaseSignIn';
import Dashboard from '../../components/Dashboard';
import ADMIN_DASHBOARD_CONFIG from '../../lib/configs/adminDashboard';
import PageHeader from '../../components/PageHeader';

/**
 *
 * I have a dream, to put all my updates here for admins.
 * except it wont work here. needs to be on the page root
 */
const MyLeasePage = props => {
  const {
    appData: { currentUser },
  } = props;
  return (
    <div>
      <PageHeader
        title="Admin Portal"
        metaData={{
          title: 'Admin portal',
          content:
            'Admin portal to manage rehouser clients and day to day activities',
        }}
      />
      <PleaseSignIn
        currentUser={currentUser}
        message="You must be signed in to view the admin area">
        <Dashboard config={ADMIN_DASHBOARD_CONFIG} />
      </PleaseSignIn>
    </div>
  );
};
export default MyLeasePage;
