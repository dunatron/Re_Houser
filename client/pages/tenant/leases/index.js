import PropTypes from 'prop-types';
import PleaseSignIn from '@/Components/PleaseSignIn';
import LeasesTable from '@/Components/Tables/LeasesTable';

const TenantLeasesPage = ({ appData: { currentUser }, query: { id } }) => {
  return (
    <>
      {/* PageHeader is on this component */}
      <PleaseSignIn
        currentUser={currentUser}
        message="You must be signed in to view your leases">
        <LeasesTable where={{}} />
      </PleaseSignIn>
    </>
  );
};

TenantLeasesPage.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object.isRequired,
  }),
  query: PropTypes.shape({
    id: PropTypes.string,
  }),
};

export default TenantLeasesPage;
