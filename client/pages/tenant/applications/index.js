import PropTypes from 'prop-types';
import PleaseSignIn from '@/Components/PleaseSignIn';
import RentalApplications from '@/Components/RentalApplications/index';

// server side props
import { initializeApollo, addApolloState } from '@/Lib/apolloClient';
import { CURRENT_USER_QUERY } from '@/Gql/queries';

const TenantApplicationsPage = ({ appData: { currentUser } }) => {
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

export async function getServerSideProps(ctx) {
  const apolloClient = initializeApollo(null, ctx);
  await apolloClient.query({
    query: CURRENT_USER_QUERY,
  });
  return addApolloState(apolloClient, {
    props: {},
  });
}

TenantApplicationsPage.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object.isRequired,
  }),
  query: PropTypes.shape({
    id: PropTypes.string,
  }),
};

export default TenantApplicationsPage;
