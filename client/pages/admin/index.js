// import PropertyDetails from "../../components/PropertyDetails/index"
import LeasesList from '../../components/LeasesList';
import PleaseSignIn from '../../components/PleaseSignIn';
import Dashboard from '../../components/Dashboard';
import ADMIN_DASHBOARD_CONFIG from '../../lib/configs/adminDashboard';

const MyLeasePage = props => {
  const {
    appData: { currentUser },
  } = props;
  return (
    <div>
      <PleaseSignIn
        currentUser={currentUser}
        message="You must be signed in to view the admin area">
        <Dashboard config={ADMIN_DASHBOARD_CONFIG} />
      </PleaseSignIn>
    </div>
  );
};
export default MyLeasePage;
