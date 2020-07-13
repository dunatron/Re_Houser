import RentalApplications from '../../components/RentalApplications.js/index';
import PleaseSignIn from '../../components/PleaseSignIn';
import PageHeader from '../../components/PageHeader';

const RentalApplicationsPage = props => {
  const {
    appData: { currentUser },
  } = props;
  return (
    <div>
      <PageHeader
        title="My Applications"
        intro="Manage and review tenancy applications for properties that you have applied for."
        metaData={{
          title: 'Rental applications',
          content: 'Rental applications the current user is involved in',
        }}
      />
      <PleaseSignIn
        currentUser={currentUser}
        message="You must be signed in to manager your applications">
        <RentalApplications />
      </PleaseSignIn>
    </div>
  );
};

export default RentalApplicationsPage;
