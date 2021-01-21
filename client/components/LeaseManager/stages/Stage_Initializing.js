import PropTypes from 'prop-types';
import SignLease from '../SignLease';

import PROPERTY_LEASE_DETAILS_EDITABLE_DISPLAY_CONF from '@/Lib/configs/editableDisplays/leaseDetails';
import EditableDisplayItems from '@/Components/EditableDisplay/EditableDisplayItems';

const StageInitializing = ({ lease, me, userIsLessor, userIsLessee }) => {
  return (
    <div>
      <EditableDisplayItems
        __typename="PropertyLease"
        data={lease}
        items={PROPERTY_LEASE_DETAILS_EDITABLE_DISPLAY_CONF}
        where={{ id: lease.id }}
        disableEdit={!userIsLessor}
      />
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
  userIsLessor: PropTypes.any,
};

export default StageInitializing;
