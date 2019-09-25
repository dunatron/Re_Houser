import RentalApplications from '../../components/RentalApplications.js/index';
import PleaseSignIn from '../../components/PleaseSignIn';

const RentalApplicationsPage = props => (
  <div>
    <PleaseSignIn>
      <RentalApplications />
    </PleaseSignIn>
  </div>
);

export default RentalApplicationsPage;
