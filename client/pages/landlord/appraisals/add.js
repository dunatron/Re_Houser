import PropTypes from 'prop-types';
import PleaseSignIn from '@/Components/PleaseSignIn';
import PropertyAppraisal from '@/Components/PropertyAppraisal';

const LandlordAppraisalAddPage = ({ appData: { currentUser } }) => {
  return (
    <PleaseSignIn
      currentUser={currentUser}
      message="Please Sign in to view: Landord Appraisals Page">
      <PropertyAppraisal />
    </PleaseSignIn>
  );
};

LandlordAppraisalAddPage.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object.isRequired,
  }),
};

export default LandlordAppraisalAddPage;
