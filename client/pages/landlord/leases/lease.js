import PropTypes from 'prop-types';
import PleaseSignIn from '@/Components/PleaseSignIn';
import LeaseManager from '@/Components/LeaseManager';

const LandLordSingleLeasePage = ({
  appData: { currentUser },
  query: { id },
}) => {
  return (
    <PleaseSignIn
      currentUser={currentUser}
      message="Please Sign in to view: Landord Properties Page">
      <LeaseManager leaseId={id} />
    </PleaseSignIn>
  );
};

LandLordSingleLeasePage.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object.isRequired,
  }),
  query: PropTypes.shape({
    id: PropTypes.string,
  }),
};

export default LandLordSingleLeasePage;
