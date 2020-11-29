import PropTypes from 'prop-types';
import PleaseSignIn from '@/Components/PleaseSignIn';
import LeaseManager from '@/Components/LeaseManager';

// server side props
import { initializeApollo, addApolloState } from '@/Lib/apolloClient';
import { CURRENT_USER_QUERY } from '@/Gql/queries';

const TenantSingleLeasePage = ({ appData: { currentUser }, query: { id } }) => {
  return (
    <PleaseSignIn
      currentUser={currentUser}
      message="Please Sign in to view: Your Lease">
      <h2>Single Lease</h2>
      <LeaseManager leaseId={id} />;
    </PleaseSignIn>
  );
};

export async function getServerSideProps(ctx) {
  const apolloClient = initializeApollo(null, ctx);
  await apolloClient.query({
    query: CURRENT_USER_QUERY,
  });
  return addApolloState(apolloClient, {
    props: {
      query: ctx.query,
    },
  });
}

TenantSingleLeasePage.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object.isRequired,
  }),
  query: PropTypes.shape({
    id: PropTypes.string,
  }),
};

export default TenantSingleLeasePage;
