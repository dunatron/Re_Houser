import PropTypes from 'prop-types';
import PropertyDetails from '@/Components/PropertyDetails';
import PleaseSignIn from '@/Components/PleaseSignIn';

import LeasesTable from '@/Components/Tables/LeasesTable';

const LandLordLeasesPage = ({ appData: { currentUser }, query: { id } }) => {
  return (
    <PleaseSignIn
      currentUser={currentUser}
      message="Please Sign in to view: Landord Properties Page">
      <h2>Landlord Lease Base LandLordLeasesPage</h2>
      <LeasesTable where={{}} />
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
