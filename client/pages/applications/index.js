import PropTypes from 'prop-types';
import RentalApplications from '@Components/RentalApplications';
import PleaseSignIn from '@Components/PleaseSignIn';
import PageHeader from '@Components/PageHeader';

const RentalApplicationsPage = ({ appData: { currentUser } }) => {
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

RentalApplicationsPage.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object.isRequired,
  }),
};

export default RentalApplicationsPage;
