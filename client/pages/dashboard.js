import Dashboard from '../components/Dashboard/index';
import PleaseSignIn from '../components/PleaseSignIn';

const DashboardPage = props => (
  <div>
    <PleaseSignIn>
      <Dashboard />
    </PleaseSignIn>
  </div>
);

export default DashboardPage;
