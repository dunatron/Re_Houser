// import React, { Component } from 'react';
// import { Mutation } from '@apollo/react-components';
// import { adopt } from 'react-adopt';
// import styled from 'styled-components';
// // components
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import Tooltip from '@material-ui/core/Tooltip';
// // import ExpansionPanel from "@material-ui/core/ExpansionPanel"
// import ExpansionPanel from '../../styles/ExpansionPanel';
// import ExpansionPanelSummary from '../../styles/ExpansionPanelSummary';
// // import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
// import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
// // import Typography from "@material-ui/core/Typography"
// import Typography from '../../styles/Typography';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// //icons
// import PersonIcon from '@material-ui/icons/Person';
// import PersonAddIcon from '@material-ui/icons/PersonAdd';
// import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

// import StarIcon from '../../styles/icons/StarIcon';
// // Mutations
// import {
//   APPLY_TO_RENTAL_GROUP_APPLICATION,
//   CREATE_PRE_RENTAL_DOCUMENT_MUTATION,
// } from '../../graphql/mutations/index';
// import ApplyToGroup from './ApplyToGroup.js';
// import User from '../User/index';

// const Composed = adopt({
//   user: ({ render }) => <User>{render}</User>,
//   applyToRentalGroup: ({ render }) => (
//     <Mutation
//       mutation={APPLY_TO_RENTAL_GROUP_APPLICATION}
//       update={(cache, payload) => {}}>
//       {render}
//     </Mutation>
//   ),
// });

// const Item = styled.div`
//   .user__strip {
//     display: flex;
//     flex-wrap: wrap;
//     align-items: center;
//     padding: 0 0 0 16px;
//   }
//   .person__btn {
//   }
//   .approved {
//     color: green;
//   }
//   .pending {
//   }
//   .completed {
//     color: orange;
//   }
//   .person__icon {
//   }
//   .name {
//   }
//   @media (max-width: ${props => props.theme.breakpoints.values.sm}px) {
//   }
// `;

// export default class ApplicationItem extends Component {
//   state = {
//     creatingDoc: false,
//   };
//   _applyToRentalGroup = async applyToRentalGroup => {
//     const res = applyToRentalGroup();
//   };
//   getNumberOfApprovedApplicants = application => {
//     const numberOfApproved = application.applicants.reduce(
//       (amount, applicant) => {
//         if (applicant.approved) {
//           amount++;
//         }
//         return amount;
//       },
//       0
//     );
//     return numberOfApproved;
//   };
//   getNumberOfPendingApplicants = application => {
//     const numberOfApproved = application.applicants.reduce(
//       (amount, applicant) => {
//         if (!applicant.approved) {
//           amount++;
//         }
//         return amount;
//       },
//       0
//     );
//     return numberOfApproved;
//   };

//   applicantStage = applicant => {
//     if (applicant.approved) return 'approved';
//     if (applicant.completed) return 'completed';
//     return '';
//   };

//   isAnApplicant = (me, application) => {
//     const isApplicant = application.applicants
//       .map(applicant => applicant.user)
//       .map(user => user.id)
//       .includes(me.id);
//     return isApplicant;
//   };

//   isOwner = (me, application) => {
//     if (me.id === application.owner.id) {
//       return true;
//     }
//     return false;
//   };

//   isPartOfApplication = (me, application) => {
//     if (this.isAnApplicant(me, application)) return true;
//     if (this.isOwner(me, application)) return true;
//     return false;
//   };

//   meetsVisibilityRequirements = (me, application) => {
//     if (application.visibility === 'PUBLIC') return true;
//     if (this.isPartOfApplication(me, application)) return true;
//     return false;
//   };
//   canShowApplication = (me, application) => {
//     // if (this.isPartOfApplication(me, application)) return true;
//     const isPartOfApplication = this.isPartOfApplication(me, application);
//     if (isPartOfApplication) return true;

//     // stages not to show if not part of application
//     const dontShowOnStages = ['ACCEPTED', 'PENDING', 'DENIED'];
//     if (dontShowOnStages.includes(application.stage)) return false;

//     if (this.meetsVisibilityRequirements(me, application)) return true;
//     return false;
//   };

//   render() {
//     const { application, index, property } = this.props;

//     console.log('Tell me of the application => ', application);

//     return (
//       <Composed>
//         {({ applyToRentalGroup, user, createPreRentalDocument }) => {
//           const me = user.data.me;
//           if (!me) {
//             return 'You must be logged In';
//           }
//           const isAnApplicant = this.isAnApplicant(me, application);
//           const isOwner = this.isOwner(me, application);
//           const canShow = this.canShowApplication(me, application);
//           if (!canShow) return null;
//           return (
//             <ExpansionPanel highlight={isAnApplicant}>
//               <ExpansionPanelSummary
//                 expandIcon={<ExpandMoreIcon />}
//                 highlight={isAnApplicant}
//                 highlightReverse={isOwner}
//                 background={isAnApplicant ? 'green' : ''}>
//                 <PersonIcon color={isOwner ? 'secondary' : 'primary'} />
//                 <Typography
//                   highlightReverse={isOwner}
//                   highlight={isAnApplicant}
//                   style={{ padding: '0 16px 0 4px' }}>
//                   {this.getNumberOfApprovedApplicants(application)}
//                 </Typography>
//                 <PersonOutlineIcon color={isOwner ? 'secondary' : 'primary'} />
//                 <Typography
//                   highlightReverse={isOwner}
//                   highlight={isAnApplicant}
//                   style={{ padding: '0 16px 0 4px' }}>
//                   {this.getNumberOfPendingApplicants(application)}
//                 </Typography>
//                 <StarIcon color={isOwner ? 'secondary' : 'primary'} />
//                 <Typography
//                   highlightReverse={isOwner}
//                   highlight={isAnApplicant}
//                   style={{ padding: '0 16px 0 4px' }}>
//                   {application.stage}
//                 </Typography>
//               </ExpansionPanelSummary>
//               <ExpansionPanelDetails>
//                 <Item>
//                   <Typography>Application ID: {application.id}</Typography>
//                   {this.state.creatingDoc && (
//                     <div>Generating your application please wait</div>
//                   )}
//                   {me.id && this._advanceApplication(me, application)}
//                   <Typography>Group Members & Applicants</Typography>
//                   {application.applicants &&
//                     application.applicants.map((applicant, idx) => {
//                       const {
//                         user: { id, firstName, lastName },
//                       } = applicant;
//                       return (
//                         <div className="user__strip">
//                           <Tooltip
//                             title={`view ${firstName} ${lastName}`}
//                             placement="top">
//                             <IconButton
//                               // className="person__btn"
//                               className={`person__btn ${this.applicantStage(
//                                 applicant
//                               )}`}
//                               aria-label="Delete">
//                               <PersonIcon className="person__icon" />
//                             </IconButton>
//                           </Tooltip>

//                           <p className="name">
//                             {firstName} {lastName}
//                           </p>
//                         </div>
//                       );
//                     })}
//                 </Item>
//               </ExpansionPanelDetails>
//             </ExpansionPanel>
//           );
//         }}
//       </Composed>
//     );
//   }

//   _advanceApplication = (me, application) => {
//     const isAnApplicant = this.isAnApplicant(me, application);
//     return (
//       <div>
//         {!isAnApplicant && this.renderApplyToGroupBtn()}
//         {isAnApplicant && this.renderUpdateApplicationBtn()}
//       </div>
//     );
//   };
//   renderUpdateApplicationBtn = () => {
//     const { application, index, property } = this.props;
//     return (
//       <div>
//         <Button
//           variant="outlined"
//           onClick={() => {
//             this.props.openRentalAppModal(application);
//           }}>
//           UPDATE APPLICATION
//         </Button>
//         {/* <Button
//           disabled={loading}
//           onClick={() => this._updateUser(updateUser)}
//           variant="outlined">
//           Update
//         </Button> */}
//       </div>
//     );
//   };

//   renderApplyToGroupBtn = () => {
//     const { application, index, property } = this.props;
//     return (
//       <ApplyToGroup
//         applicationId={application.id}
//         application={application}
//         property={property}
//         openRentalAppModal={rentalData =>
//           this.props.openRentalAppModal(rentalData)
//         }
//       />
//     );
//   };
// }

import React, { useState } from 'react';
import { Mutation } from '@apollo/react-components';
import { adopt } from 'react-adopt';
import styled from 'styled-components';
// components
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
// import ExpansionPanel from "@material-ui/core/ExpansionPanel"
import ExpansionPanel from '../../styles/ExpansionPanel';
import ExpansionPanelSummary from '../../styles/ExpansionPanelSummary';
// import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
// import Typography from "@material-ui/core/Typography"
import Typography from '../../styles/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

//icons
import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

import StarIcon from '../../styles/icons/StarIcon';
// Mutations
import {
  APPLY_TO_RENTAL_GROUP_APPLICATION,
  CREATE_PRE_RENTAL_DOCUMENT_MUTATION,
} from '../../graphql/mutations/index';
import ApplyToGroup from './ApplyToGroup.js';
import User from '../User/index';
import { useMutation } from '@apollo/client';
import { useCurrentUser } from '../User';

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

const ApplicationItem = () => {
  // NEED application, me, applicant
  const { application, index, property } = this.props;
  const [createingDoc, setCreatingDoc] = useState(false);
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

  const isAnApplicant = () => {
    const isApplicant = application.applicants
      .map(applicant => applicant.user)
      .map(user => user.id)
      .includes(me.id);
    return isApplicant;
  };

  const isOwner = () => {
    if (me.id === application.owner.id) {
      return true;
    }
    return false;
  };

  const isPartOfApplication = () => {
    if (isAnApplicant()) return true;
    if (isOwner()) return true;
    return false;
  };

  const meetsVisibilityRequirements = () => {
    if (application.visibility === 'PUBLIC') return true;
    if (isPartOfApplication()) return true;
    return false;
  };
  const canShowApplication = () => {
    // if (this.isPartOfApplication(me, application)) return true;
    const isPartOfApplication = isPartOfApplication();
    if (isPartOfApplication) return true;

    // stages not to show if not part of application
    const dontShowOnStages = ['ACCEPTED', 'PENDING', 'DENIED'];
    if (dontShowOnStages.includes(application.stage)) return false;

    if (meetsVisibilityRequirements()) return true;
    return false;
  };

  const _advanceApplication = () => {
    const isAnApplicant = isAnApplicant();
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
        <Button
          variant="outlined"
          onClick={() => {
            props.openRentalAppModal(application);
          }}>
          UPDATE APPLICATION
        </Button>
        {/* <Button
          disabled={loading}
          onClick={() => this._updateUser(updateUser)}
          variant="outlined">
          Update
        </Button> */}
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

  const isAnApplicant = isAnApplicant();
  const isOwner = isOwner();
  const canShow = canShowApplication();

  const numberOfApprovedApplicants = getNumberOfApprovedApplicants();
  const numberOfPendingApplicants = getNumberOfPendingApplicants();
  const applicationStage = application.stage;

  if (!canShow) return null;
  return (
    <ExpansionPanel highlight={isAnApplicant}>
      <ExpansionPanelSummary
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
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
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
                <div className="user__strip">
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
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};
