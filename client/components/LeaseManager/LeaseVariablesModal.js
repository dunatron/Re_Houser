import Modal from '@/Components/Modal';
import { useState } from 'react';

import PROPERTY_LEASE_DETAILS_EDITABLE_DISPLAY_CONF from '@/Lib/configs/editableDisplays/leaseDetails';
import EditableDisplayItems from '@/Components/EditableDisplay/EditableDisplayItems';

import { Button } from '@material-ui/core';
// userIsLessor={userIsLessor}
// userIsLessee={userIsLessee}
const LeaseVariablesModal = ({ lease, userIsLessor }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="outlined"
        style={{ borderRadius: 0 }}>
        View Lease Variables
      </Button>
      <Modal open={open} close={handleClose}>
        <EditableDisplayItems
          __typename="PropertyLease"
          data={lease}
          items={PROPERTY_LEASE_DETAILS_EDITABLE_DISPLAY_CONF}
          where={{ id: lease.id }}
          disableEdit={!userIsLessor}
        />
      </Modal>
    </div>
  );
};

export default LeaseVariablesModal;
