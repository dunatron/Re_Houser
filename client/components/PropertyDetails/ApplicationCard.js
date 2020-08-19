import React, { Component } from 'react';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import { RENTAL_APPLICATIONS_QUERY } from '../../graphql/queries/index';
import { ACCEPT_RENTAL_APPLICATION_MUTATION } from '../../graphql/mutations/acceptRentalApplication';
import { RENTAL_APPLICATION_CREATED_SUBSCRIPTION } from '../../graphql/subscriptions/RentalApplicationCreatedSub';
import { RENTAL_APPLICATION_UPDATED_SUBSCRIPTION } from '../../graphql/subscriptions/RentalApplicationUpdatedSub';
import PropertyPendingRentalApplicationsSub from '../SubscriptionComponents/PropertyPendingRentalApplicationsSub';
import Card from '@material-ui/core/Card';
import ExpansionPanel from '../../styles/ExpansionPanel';
import ExpansionPanelSummary from '../../styles/ExpansionPanelSummary';

// import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import DialogPopup from '../DialogPopup/index';
// import Typography from "@material-ui/core/Typography"
import Typography from '../../styles/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//icons
import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

import StarIcon from '../../styles/icons/StarIcon';

import ApplicantDetails from '../ApplicantDetails/index';
import AcceptApplicationButton from '../MutationButtons/AcceptApplicationButton';
import DenyApplicationButton from '../MutationButtons/DenyApplicationButton';
import { Button } from '@material-ui/core';

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
              <ApplicantDetails applicant={applicant} />
            ))}
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Card>
  );
};

export default ApplicationCard;
