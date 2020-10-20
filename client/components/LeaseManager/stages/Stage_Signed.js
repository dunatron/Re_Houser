import PropTypes from "prop-types";
import SignLease from '../SignLease';
import { Paper, Typography } from '@material-ui/core';
import LeaseWallet from '../../LeaseWallet';

const StageSigned = ({ lease, me }) => {
  return (
    <Paper>
      <Typography variant="h1">Signed stage</Typography>
      <Typography>
        Congratulations your lease has now been signed. You now need to supply 1
        weeks worth of rent before it can go into full effect
      </Typography>
      <LeaseWallet lease={lease} me={me} />
    </Paper>
  );
};

StageSigned.propTypes = {
  lease: PropTypes.any,
  me: PropTypes.any
}

export default StageSigned;
