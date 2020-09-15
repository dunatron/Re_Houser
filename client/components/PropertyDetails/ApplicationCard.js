import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import ExpansionPanel from '@/Styles/ExpansionPanel';
import ExpansionPanelSummary from '@/Styles/ExpansionPanelSummary';

// import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
// import Typography from "@material-ui/core/Typography"
import Typography from '@/Styles/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//icons
import PersonIcon from '@material-ui/icons/Person';

import ApplicantDetails from '@/Components/ApplicantDetails/index';
import AcceptApplicationButton from '@/Components/MutationButtons/AcceptApplicationButton';
import DenyApplicationButton from '@/Components/MutationButtons/DenyApplicationButton';

const ApplicationCard = ({ application, property }) => {
  return (
    <Card style={{ marginBottom: '30px' }}>
      {/* <DialogPopup isOpen={true} /> */}
      <Typography variant="h5">ID: {application.id}</Typography>
      <Typography>Visibility: {application.visibility}</Typography>
      <Typography>Stage: {application.stage}</Typography>
      <Typography>FINALISED: {application.finalised ? 'YES' : 'NO'}</Typography>
      {application.leaseId && (
        <Typography>LeaseId: {application.leaseId}</Typography>
      )}

      {/* <AcceptApplication application={application} property={property} /> */}
      <AcceptApplicationButton application={application} property={property} />
      <DenyApplicationButton application={application} property={property} />
      <Typography>FINALISED: {application.finalised ? 'YES' : 'NO'}</Typography>

      <ExpansionPanel highlight={false}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <PersonIcon color={'secondary'} />
          <Typography
            // highlightReverse={isOwner}
            // highlight={isAnApplicant}
            style={{ padding: '0 16px 0 4px' }}>
            {application.applicants.length} Applicants
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div>
            <h2>Some stuff</h2>
            {application.applicants.map((applicant, i) => (
              <ApplicantDetails key={applicant.id} applicant={applicant} />
            ))}
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Card>
  );
};

ApplicationCard.propTypes = {
  application: PropTypes.shape({
    applicants: PropTypes.shape({
      length: PropTypes.any,
      map: PropTypes.func,
    }),
    finalised: PropTypes.any,
    id: PropTypes.any,
    leaseId: PropTypes.any,
    stage: PropTypes.any,
    visibility: PropTypes.any,
  }).isRequired,
  property: PropTypes.any.isRequired,
};

export default ApplicationCard;
