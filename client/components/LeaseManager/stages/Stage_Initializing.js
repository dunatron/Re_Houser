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

export default StageInitializing;
