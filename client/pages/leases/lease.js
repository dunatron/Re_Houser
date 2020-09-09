import PropTypes from 'prop-types';
import LeaseManager from '../../components/LeaseManager/index';
import PleaseSignIn from '../../components/PleaseSignIn';

const LeasePage = ({ appData: { currentUser }, query: { id } }) => {
  return (
    <div>
      {/* PageHeader on LeaseManager component*/}
      <PleaseSignIn
        currentUser={currentUser}
        message="You cannot view a lease without being signed in">
        <LeaseManager leaseId={id} />
      </PleaseSignIn>
    </div>
  );
};

LeasePage.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object.isRequired,
  }),
  query: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default LeasePage;
