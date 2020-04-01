import Dashboard from '../components/Dashboard/index';
import PleaseSignIn from '../components/PleaseSignIn';
import { FormCreator } from '../components/Forms';
import FIELDS_CONFIG from '../components/Forms/InsulationStatementForm/fieldsConf';

const DashboardPage = props => (
  <div>
    <FormCreator
      config={FIELDS_CONFIG}
      data={{
        meetsMinCeilingReq: true,
      }}
    />
    <PleaseSignIn>
      <Dashboard />
    </PleaseSignIn>
  </div>
);

export default DashboardPage;
