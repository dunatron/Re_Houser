import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import Modal from '../Modal/index';
import LeasePdf from '../Pdfs/LeasePdf';

import TextPdfGeneratorCombo from '@/Components/Pdfs/TextPdfGeneratorCombo';
import _generateLeasePdf from '@/Lib/configs/pdfs/_generateLeasePdf';

// const DownloadLease = ({ lease, me }) => {
//   const [open, setOpen] = useState(false);
//   return (
//     <>
//       <Modal title="Lease PDF" open={open} close={() => setOpen(false)}>
//         <LeasePdf lease={lease} me={me} />
//       </Modal>
//       <Button onClick={() => setOpen(!open)}>View Lease Document</Button>
//     </>
//   );
// };

const DownloadLease = ({ lease, me }) => {
  const leasePdfConf = _generateLeasePdf(lease);
  return (
    <TextPdfGeneratorCombo
      config={leasePdfConf}
      docConf={{
        title: 'Lease',
        author: 'Rehouser',
        subject: 'Rehouser Property Lease',
        keywords: 'Rehouser, property, lease, pdf',
        creator: 'Rehouser',
        producer: 'Rehouser',
      }}
    />
  );
};

DownloadLease.propTypes = {
  lease: PropTypes.any,
  me: PropTypes.any,
};

export default DownloadLease;
