import PropTypes from 'prop-types';
import PleaseSignIn from '@/Components/PleaseSignIn';
import RentalApplications from '@/Components/RentalApplications/index';

// server side props
import { initializeApollo, addApolloState } from '@/Lib/apolloClient';
import { CURRENT_USER_QUERY } from '@/Gql/queries';

const TenantApplicationsPage = ({
  appData: { currentUser },
  query: { id },
}) => {
  return (
    <>
      {/* PageHeader is on this component */}
      <PleaseSignIn
        currentUser={currentUser}
        message="You must be signed in to manage this property">
        <RentalApplications />
      </PleaseSignIn>
    </>
  );
};

TenantApplicationsPage.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object.isRequired,
  }),
  query: PropTypes.shape({
    id: PropTypes.string,
  }),
};

export default TenantApplicationsPage;
