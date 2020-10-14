import PropTypes from 'prop-types';
import { Card, IconButton, Tooltip } from '@material-ui/core';
import ExpansionPanel from '@/Styles/ExpansionPanel';
import ExpansionPanelSummary from '@/Styles/ExpansionPanelSummary';

// import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
// import Typography from "@material-ui/core/Typography"
import {Box, Typography} from '@material-ui/core/'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//icons
import PersonIcon from '@material-ui/icons/Person';
import ReceiptIcon from '@material-ui/icons/Receipt';

import AdminApplicantDetails from '@/Components/ApplicantDetails/AdminApplicantDetails';
import AcceptApplicationButton from '@/Components/MutationButtons/AcceptApplicationButton';
import DenyApplicationButton from '@/Components/MutationButtons/DenyApplicationButton';
import { makeStyles } from '@material-ui/core/styles';
import ChangeRouteBtn from '@/Components/Routes/ChangeRouteButton'

const useStyles = makeStyles(theme => ({
  root: {
    // marginTop: '30px',
    margin: '16px',
    padding: '16px',
    maxWidth: '100%',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
  },
  details: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: theme.spacing(1),
  },
  detailItem: {
    marginRight: '16px',
    marginBottom: '16px',
  },
  actions: {
    marginBottom: theme.spacing(1),
  },
}));

const ApplicationCard = ({ application, property, me }) => {
  console.log('WHat do I have for this application => ', application);
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      {/* <DialogPopup isOpen={true} /> */}
      <div className={classes.title}>
        <Tooltip title={application.id}>
          <IconButton onClick={() => alert('ToDO copy id to clipboard')}>
            {' '}
            <ReceiptIcon />
          </IconButton>
        </Tooltip>
        <Typography>Rental Application</Typography>
      </div>
      <div className={classes.details}>
        <Typography variant="body2" className={classes.detailItem}>
          Visibility: {application.visibility}
        </Typography>
        <Typography variant="body2" className={classes.detailItem}>
          Stage: {application.stage}
        </Typography>
        <Typography variant="body2" className={classes.detailItem}>
          Finalised: {application.finalised ? 'YES' : 'NO'}
        </Typography>
        <Typography variant="body2" className={classes.detailItem}>
          Created: {application.createdAt ? application.createdAt : null}
        </Typography>
      </div>

      {application.leaseId && (
        <Box>
          <Typography gutterBottom>Application has been accepted as it has a leaseId associated with it</Typography>
          
          <ChangeRouteBtn 
            title="Go to lease"
            route="/landlord/leases/lease"
            query={{
              id: application.leaseId
            }}
            variant="contained"
            color="secondary"
          />
          <Typography gutterBottom>LeaseId: {application.leaseId}</Typography>
        </Box>
      )}

      {/* <AcceptApplication application={application} property={property} /> */}
      {!application.leaseId && <div className={classes.actions}>
        <AcceptApplicationButton
          application={application}
          property={property}
        />
        <DenyApplicationButton application={application} property={property} />
      </div>}
      
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
        <ExpansionPanelDetails
          style={{
            display: 'block',
          }}>
          {application.applicants.map((applicant, i) => (
            <AdminApplicantDetails key={applicant.id} applicant={applicant} />
          ))}
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
