import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Grid,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import formatMoney from '@/Lib/formatMoney';
import RentalAppraisal from '@/Components/RentalAppraisal';

const AssociatedAppraisal = ({ appraisalId, rentalAppraisal }) => {
  if (!appraisalId) return null;
  return (
    <div style={{ marginBottom: '16px' }}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Appraisal for: {rentalAppraisal.location}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <RentalAppraisal rentalAppraisal={rentalAppraisal} />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

export default AssociatedAppraisal;
