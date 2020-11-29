import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Mutation } from '@apollo/react-components';
import { adopt } from 'react-adopt';
import styled from 'styled-components';
// components
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Accordion from '@/Styles/Accordion';
import AccordionSummary from '@/Styles/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@/Styles/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//icons
import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

import StarIcon from '@/Styles/icons/StarIcon';
// Mutations
import {
  APPLY_TO_RENTAL_GROUP_APPLICATION,
  CREATE_PRE_RENTAL_DOCUMENT_MUTATION,
} from '@/Gql/mutations/index';
import ApplyToGroup from './ApplyToGroup.js';
import User from '@/Components/User/index';
import { useMutation } from '@apollo/client';
import { useCurrentUser } from '@/Components/User';
import ChangeRouteBtn from '@/Components/Routes/ChangeRouteButton';

const Composed = adopt({
  user: ({ render }) => <User>{render}</User>,
  applyToRentalGroup: ({ render }) => (
    <Mutation
      mutation={APPLY_TO_RENTAL_GROUP_APPLICATION}
      update={(cache, payload) => {}}>
      {render}
    </Mutation>
  ),
});

const Item = styled.div`
  .user__strip {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 0 0 0 16px;
  }
  .person__btn {
  }
  .approved {
    color: green;
  }
  .pending {
  }
  .completed {
    color: orange;
  }
  .person__icon {
  }
  .name {
  }
  @media (max-width: ${props => props.theme.breakpoints.values.sm}px) {
  }
`;

const ApplicationItem = props => {
  // NEED application, me, applicant
  const { application, index, property } = props;
  const [creatingDoc, setCreatingDoc] = useState(false);
  const user = useCurrentUser();
  const [applyToRentalGroup, applyToRentalGroupProps] = useMutation(
    APPLY_TO_RENTAL_GROUP_APPLICATION
  );
  const me = user.data ? user.data.me : null;

  if (!me) return 'You must be logged in my bro';

  const _applyToRentalGroup = async applyToRentalGroup => {
    const res = applyToRentalGroup();
  };

  const getNumberOfApprovedApplicants = () => {
    const numberOfApproved = application.applicants.reduce(
      (amount, applicant) => {
        if (applicant.approved) {
          amount++;
        }
        return amount;
      },
      0
    );
    return numberOfApproved;
  };
  const getNumberOfPendingApplicants = () => {
    const numberOfApproved = application.applicants.reduce(
      (amount, applicant) => {
        if (!applicant.approved) {
          amount++;
        }
        return amount;
      },
      0
    );
    return numberOfApproved;
  };

  const applicantStage = applicant => {
    if (applicant.approved) return 'approved';
    if (applicant.completed) return 'completed';
    return '';
  };

  const _isAnApplicant = () => {
    const isApplicant = application.applicants
      .map(applicant => applicant.user)
      .map(user => user.id)
      .includes(me.id);
    return isApplicant;
  };

  const _isOwner = () => {
    if (me.id === application.owner.id) {
      return true;
    }
    return false;
  };

  const _isPartOfApplication = () => {
    if (_isAnApplicant()) return true;
    if (_isOwner()) return true;
    return false;
  };

  const meetsVisibilityRequirements = () => {
    if (application.visibility === 'PUBLIC') return true;
    if (_isPartOfApplication()) return true;
    return false;
  };
  const canShowApplication = () => {
    // if (this.isPartOfApplication(me, application)) return true;
    const isPartOfApplication = _isPartOfApplication();
    if (isPartOfApplication) return true;

    // stages not to show if not part of application
    const dontShowOnStages = ['ACCEPTED', 'PENDING', 'DENIED'];
    if (dontShowOnStages.includes(application.stage)) return false;

    if (meetsVisibilityRequirements()) return true;
    return false;
  };

  const _advanceApplication = () => {
    const isAnApplicant = _isAnApplicant();
    return (
      <div>
        {!isAnApplicant && renderApplyToGroupBtn()}
        {isAnApplicant && renderUpdateApplicationBtn()}
      </div>
    );
  };
  const renderUpdateApplicationBtn = () => {
    const { application, index, property } = props;
    return (
      <div>
        <ChangeRouteBtn
          title="Update Application"
          route={`/tenant/applications/${application.id}`}
        />
        <Button
          variant="outlined"
          onClick={() => {
            props.openRentalAppModal(application);
          }}>
          UPDATE APPLICATION
        </Button>
      </div>
    );
  };

  const renderApplyToGroupBtn = () => {
    const { application, index, property } = props;
    return (
      <ApplyToGroup
        applicationId={application.id}
        application={application}
        property={property}
        openRentalAppModal={rentalData => props.openRentalAppModal(rentalData)}
      />
    );
  };

  const isAnApplicant = _isAnApplicant();
  const isOwner = _isOwner();
  const canShow = canShowApplication();

  const numberOfApprovedApplicants = getNumberOfApprovedApplicants();
  const numberOfPendingApplicants = getNumberOfPendingApplicants();
  const applicationStage = application.stage;

  if (!canShow) return null;
  return (
    <Accordion highlight={isAnApplicant}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        highlight={isAnApplicant}
        highlightReverse={isOwner}
        background={isAnApplicant ? 'green' : ''}>
        <PersonIcon color={isOwner ? 'secondary' : 'primary'} />
        <Typography
          highlightReverse={isOwner}
          highlight={isAnApplicant}
          style={{ padding: '0 16px 0 4px' }}>
          {numberOfApprovedApplicants}
        </Typography>
        <PersonOutlineIcon color={isOwner ? 'secondary' : 'primary'} />
        <Typography
          highlightReverse={isOwner}
          highlight={isAnApplicant}
          style={{ padding: '0 16px 0 4px' }}>
          {numberOfPendingApplicants}
        </Typography>
        <StarIcon color={isOwner ? 'secondary' : 'primary'} />
        <Typography
          highlightReverse={isOwner}
          highlight={isAnApplicant}
          style={{ padding: '0 16px 0 4px' }}>
          {applicationStage}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Item>
          <Typography>Application ID: {application.id}</Typography>
          {creatingDoc && <div>Generating your application please wait</div>}
          {me.id && _advanceApplication()}
          <Typography>Group Members & Applicants</Typography>
          {application.applicants &&
            application.applicants.map((applicant, idx) => {
              const {
                user: { id, firstName, lastName },
              } = applicant;
              return (
                <div className="user__strip" key={id}>
                  <Tooltip
                    title={`view ${firstName} ${lastName}`}
                    placement="top">
                    <IconButton
                      // className="person__btn"
                      className={`person__btn ${applicantStage(applicant)}`}
                      aria-label="Delete">
                      <PersonIcon className="person__icon" />
                    </IconButton>
                  </Tooltip>

                  <p className="name">
                    {firstName} {lastName}
                  </p>
                </div>
              );
            })}
        </Item>
      </AccordionDetails>
    </Accordion>
  );
};

ApplicationItem.propTypes = {
  application: PropTypes.shape({
    applicants: PropTypes.shape({
      map: PropTypes.func,
      reduce: PropTypes.func,
    }),
    id: PropTypes.any,
    owner: PropTypes.shape({
      id: PropTypes.any,
    }),
    stage: PropTypes.any,
    visibility: PropTypes.string,
  }).isRequired,
  index: PropTypes.any,
  openRentalAppModal: PropTypes.func.isRequired,
  property: PropTypes.any,
};

export default ApplicationItem;
