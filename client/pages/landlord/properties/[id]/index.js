import PropTypes from 'prop-types';
import PropertyDetails from '@/Components/PropertyDetails/index';
import PleaseSignIn from '@/Components/PleaseSignIn';

// server side props
import { initializeApollo, addApolloState } from '@/Lib/apolloClient';
import { CURRENT_USER_QUERY } from '@/Gql/queries';
import { SINGLE_OWNER_PROPERTY_QUERY } from '@/Gql/queries/index';

const PropertyPage = ({ appData: { currentUser }, query: { id } }) => {
  return (
    <>
      {/* PageHeader is on this component */}
      <PleaseSignIn
        currentUser={currentUser}
        message="You must be signed in to manage this property">
        <PropertyDetails id={id} />
      </PleaseSignIn>
    </>
  );
};

PropertyPage.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object.isRequired,
  }),
  query: PropTypes.shape({
    id: PropTypes.string,
  }),
};

export default PropertyPage;
