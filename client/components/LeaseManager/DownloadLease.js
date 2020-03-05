import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import Modal from '../Modal/index';

const DownloadLease = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Modal title="Lease PDF" open={open} close={() => setOpen(false)}></Modal>
      <Button onClick={() => setOpen(!open)}>View Lease Document</Button>
    </>
  );
};

// const LeasePdfDocument = () => {
//     return (

//     )
// }

export default DownloadLease;
