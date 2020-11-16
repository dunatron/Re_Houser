import InspectionForm from './InspectionForm';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const UpdateInspectionForm = ({ inspection }) => {
  return (
    <div>
      {inspection.inspector && inspection.inspector.firstName}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Start Inspection Amendment</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <InspectionForm inspection={inspection} isAmend />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default UpdateInspectionForm;
