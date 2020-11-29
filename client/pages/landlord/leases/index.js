import PropTypes from 'prop-types';
import PropertyDetails from '@/Components/PropertyDetails';
import PleaseSignIn from '@/Components/PleaseSignIn';

import LeasesTable from '@/Components/Tables/LeasesTable';

// server side props
import { initializeApollo, addApolloState } from '@/Lib/apolloClient';
import { CURRENT_USER_QUERY } from '@/Gql/queries';

const LandLordLeasesPage = ({ appData: { currentUser } }) => {
  return (
    <PleaseSignIn
      currentUser={currentUser}
      message="Please Sign in to view: Landord Properties Page">
      <h2>Landlord Lease Base LandLordLeasesPage</h2>
      <LeasesTable where={{}} />
    </PleaseSignIn>
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

LandLordLeasesPage.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object.isRequired,
  }),
  query: PropTypes.shape({
    id: PropTypes.string,
  }),
};

export default LandLordLeasesPage;
