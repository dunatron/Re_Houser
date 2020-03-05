import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import Modal from '../Modal/index';
import LeasePdf from '../Pdfs/LeasePdf';

const DownloadLease = ({ lease, me }) => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Modal title="Lease PDF" open={open} close={() => setOpen(false)}>
        <LeasePdf lease={lease} me={me} />
      </Modal>
      <Button onClick={() => setOpen(!open)}>View Lease Document</Button>
    </>
  );
};

export default DownloadLease;
