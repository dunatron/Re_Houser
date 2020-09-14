import PropTypes from 'prop-types';
import PropertyDetails from '../../../components/PropertyDetails/index';
import PleaseSignIn from '../../../components/PleaseSignIn';

import LeasesList from '../../../components/LeasesList';

const LandLordLeasesPage = ({ appData: { currentUser }, query: { id } }) => {
  return (
    <PleaseSignIn
      currentUser={currentUser}
      message="Please Sign in to view: Landord Properties Page">
      <h2>Landlord Lease Base LandLordLeasesPage</h2>
      <LeasesList />
    </PleaseSignIn>
  );
};

LandLordLeasesPage.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object.isRequired,
  }),
  query: PropTypes.shape({
    id: PropTypes.string,
  }),
};

export default LandLordLeasesPage;
