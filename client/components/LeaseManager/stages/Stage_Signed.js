import PropTypes from 'prop-types';
import SignLease from '../SignLease';
import { Paper, Typography } from '@material-ui/core';
import RPaper from '@/Styles/RehouserPaper';
import LeaseWallet from '../../LeaseWallet';
import { Alert, AlertTitle } from '@material-ui/lab';

const StageSigned = ({ lease, me }) => {
  return (
    <RPaper>
      <Typography variant="h1" gutterBottom>
        Signed stage
      </Typography>
      <Alert severity="info" style={{ marginBottom: '16px' }}>
        <AlertTitle>Lease Signed</AlertTitle>
        <Typography>
          Congratulations your lease has now been signed. You now need to supply
          1 weeks worth of rent before it can go into full effect
        </Typography>
      </Alert>
      <PrePayOneWeekRent />

      <LeaseWallet lease={lease} me={me} />
    </RPaper>
  );
};

// this component will show how much has been paid on the lease?
// better to get the actual amount and only charge the 1 weeks work of rent initially.
//
const PrePayOneWeekRent = () => {
  return (
    <>
      <Alert severity="info" style={{ marginBottom: '16px' }}>
        <AlertTitle>1 Weeks Rent Requirement</AlertTitle>
        <Typography>
          For this lease to go into full effect we require a total of one weeks
          worth of rent
        </Typography>
      </Alert>
    </>
  );
};

StageSigned.propTypes = {
  lease: PropTypes.any,
  me: PropTypes.any,
};

export default StageSigned;
