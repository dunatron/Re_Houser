import PropTypes from 'prop-types';
import PleaseSignIn from '@/Components/PleaseSignIn';
import PropertyAppraisal from '@/Components/PropertyAppraisal';

import AssociatedAppraisal from '@/Components/CreateProperty/AssociatedAppraisal';

const LandlordViewAppraisalPage = ({ appData: { currentUser } }) => {
  const me = currentUser.data ? currentUser.data.me : null;
  return (
    <PleaseSignIn
      currentUser={currentUser}
      message="Please Sign in to view: Landord Appraisals Page">
      <h2>View A SIngle Appraisal</h2>
    </PleaseSignIn>
  );
};

LandlordViewAppraisalPage.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object.isRequired,
  }),
};

export default LandlordViewAppraisalPage;
