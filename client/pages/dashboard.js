import Dashboard from '../components/Dashboard/index';
import PleaseSignIn from '../components/PleaseSignIn';

import DASHBOARD_CONFIG from '../lib/configs/dashboardConfig';

const DashboardPage = props => {
  const {
    appData: { currentUser },
  } = props;
  return (
    <div>
      <PleaseSignIn currentUser={currentUser}>
        <Dashboard config={DASHBOARD_CONFIG} />
      </PleaseSignIn>
    </div>
  );
};

export default DashboardPage;
