import SignLease from '../SignLease';
import { Paper, Typography } from '@material-ui/core';
import RehouserPaper from '../../../styles/RehouserPaper';
// components
import LeaseWallet from '../../LeaseWallet';
import DownloadLease from '../DownloadLease';

const StagePaid = ({ lease, me }) => {
  return (
    <>
      <RehouserPaper>
        <Typography variant="h1" gutterBottom>
          Active Lease
        </Typography>
        <Typography>Lease is currently fully active</Typography>
      </RehouserPaper>
      {/* Download Lease */}
      <RehouserPaper>
        <Typography variant="h5" gutterBottom>
          Download Lease
        </Typography>
        <DownloadLease lease={lease} me={me} />
      </RehouserPaper>
      {/* Payments */}
      <RehouserPaper>
        <Typography variant="h5" gutterBottom>
          Payments
        </Typography>
        <LeaseWallet lease={lease} me={me} />
      </RehouserPaper>
    </>
  );
};

// const StagePaid = ({ lease, me }) => {
//   return (
//     <RehouserPaper>
//       <Typography variant="h1" gutterBottom>
//         Active Lease
//       </Typography>
//       <Typography>Lease is currently fully active</Typography>
//       {/* Download Lease */}
//       <Typography variant="h5">Download Lease</Typography>
//       <DownloadLease lease={lease} me={me} />
//       {/* Payments */}
//       <Typography variant="h5">Payments</Typography>
//       <LeaseWallet lease={lease} me={me} />
//     </RehouserPaper>
//   );
// };

export default StagePaid;
