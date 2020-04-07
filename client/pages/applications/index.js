import RentalApplications from '../../components/RentalApplications.js/index';
import PleaseSignIn from '../../components/PleaseSignIn';

const RentalApplicationsPage = props => {
  const {
    appData: { currentUser },
  } = props;
  return (
    <div>
      <PleaseSignIn
        currentUser={currentUser}
        message="You must be signed in to manager your applications">
        <RentalApplications />
      </PleaseSignIn>
    </div>
  );
};

export default RentalApplicationsPage;
