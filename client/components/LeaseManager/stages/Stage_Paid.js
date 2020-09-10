import PropTypes from "prop-types";
import SignLease from '../SignLease';
import { Paper, Typography } from '@material-ui/core';
import RehouserPaper from '../../../styles/RehouserPaper';
// components
import LeaseWallet from '../../LeaseWallet';
import DownloadLease from '../DownloadLease';
import InspectionsTable from '../../Tables/InspectionsTable';

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
      {/* Inspections */}
      <RehouserPaper>
        <Typography variant="h5" gutterBottom>
          Inspections
        </Typography>
        <InspectionsTable />
      </RehouserPaper>
    </>
  );
};

StagePaid.propTypes = {
  lease: PropTypes.any.isRequired,
  me: PropTypes.any.isRequired
}

export default StagePaid;
