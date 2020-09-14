import PropTypes from 'prop-types';
import PropertyDetails from '../../../components/PropertyDetails/index';
import PleaseSignIn from '../../../components/PleaseSignIn';
import PropertyAppraisal from '../../../components/PropertyAppraisal';

const LandLordAppraisalsPage = ({
  appData: { currentUser },
  query: { id },
}) => {
  return (
    <PleaseSignIn
      currentUser={currentUser}
      message="Please Sign in to view: Landord Properties Page">
      <PropertyAppraisal />
    </PleaseSignIn>
  );
};

LandLordAppraisalsPage.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object.isRequired,
  }),
  query: PropTypes.shape({
    id: PropTypes.string,
  }),
};

export default LandLordAppraisalsPage;
