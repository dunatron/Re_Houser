import PropTypes from 'prop-types';
import PropertyDetails from '../../../components/PropertyDetails/index';
import PleaseSignIn from '../../../components/PleaseSignIn';

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
