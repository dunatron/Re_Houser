// import PropertyDetails from "../../components/PropertyDetails/index"
import LeasesList from '../../components/LeasesList';
import PleaseSignIn from '../../components/PleaseSignIn';
import Dashboard from '../../components/Dashboard';
import ADMIN_DASHBOARD_CONFIG from '../../lib/configs/adminDashboard';
import PageHeader from '../../components/PageHeader';

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
