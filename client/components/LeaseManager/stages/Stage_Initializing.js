import PropTypes from "prop-types";
import SignLease from '../SignLease';

const StageInitializing = ({ lease, me, userIsLessor, userIsLessee }) => {
  return (
    <div>
      <SignLease
        lease={lease}
        me={me}
        userIsLessor={userIsLessor}
        userIsLessee={userIsLessee}
      />
    </div>
  );
};

StageInitializing.propTypes = {
  lease: PropTypes.any.isRequired,
  me: PropTypes.any.isRequired,
  userIsLessee: PropTypes.any.isRequired,
  userIsLessor: PropTypes.any.isRequired
}

export default StageInitializing;
