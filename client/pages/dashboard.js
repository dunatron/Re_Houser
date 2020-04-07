import Dashboard from '../components/Dashboard/index';
import PleaseSignIn from '../components/PleaseSignIn';

const DashboardPage = props => {
  const {
    appData: { currentUser },
  } = props;
  return (
    <div>
      <PleaseSignIn currentUser={currentUser}>
        <Dashboard />
      </PleaseSignIn>
    </div>
  );
};

export default DashboardPage;
