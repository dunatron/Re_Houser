import InspectionForm from './InspectionForm';
import {
  Box,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Grid,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const UpdateInspectionForm = ({ inspection }) => {
  return (
    <div>
      {inspection.inspector && inspection.inspector.firstName}
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Start Inspection Amendment</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <InspectionForm inspection={inspection} isAmend />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

export default UpdateInspectionForm;
