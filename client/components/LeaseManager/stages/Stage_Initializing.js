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
  lease: PropTypes.any,
  me: PropTypes.any,
  userIsLessee: PropTypes.any,
  userIsLessor: PropTypes.any
}

export default StageInitializing;
