import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import formatMoney from '@/Lib/formatMoney';
import RentalAppraisal from '@/Components/RentalAppraisal';

const AssociatedAppraisal = ({ appraisalId, rentalAppraisal }) => {
  if (!appraisalId) return null;
  return (
    <div style={{ marginBottom: '16px' }}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Appraisal for: {rentalAppraisal.location}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <RentalAppraisal rentalAppraisal={rentalAppraisal} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AssociatedAppraisal;
