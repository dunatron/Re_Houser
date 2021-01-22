import PropTypes from 'prop-types';
import React, { useRef, useEffect } from 'react';
import {
  Share,
  ShareButton,
  Initialize,
  Comments,
  Page,
  CustomChat,
  SendToMessenger,
  Subscribe,
  Status,
  CommentsCount,
  Login,
} from 'react-facebook';
import { useQuery, useMutation } from '@apollo/client';
import {
  Typography,
  Box,
  TextField,
  FormControlLabel,
  Switch,
  Button,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useForm } from 'react-hook-form';
import SuperiorTable from '@/Components/SuperiorTable';
import UserProfile from '@/Components/UserProfile';
import {
  UPDATE_RENTAL_APPLICATION_MUTATION,
  UPDATE_RENTAL_GROUP_APPLICANT_MUTATION,
} from '@/Gql/mutations/index';
import Error from '@/Components/ErrorMessage';
import InviteUser from '@/Components/User/Invite';

const ApplicationDetailsStep = ({
  property,
  rentalApplication,
  me,
  completed,
  isAnAdmin,
  isOwner,
  isAnApplicant,
  refetch,
  refetching,
}) => {
  const { applicants } = rentalApplication;

  console.log('RENTAL APPLICATION DATA => ', rentalApplication);

  // SHould really use hooks ContextProvider as the main index has this
  const [updateApplication, { error, loading }] = useMutation(
    UPDATE_RENTAL_APPLICATION_MUTATION
  );

  const {
    register,
    handleSubmit,
    errors,
    setValue,
    getValues,
    reset,
  } = useForm({
    defaultValues: {},
  });

  const onSubmit = data => {
    const newApplicantData = applicants.map(applicnt => {
      return {
        id: applicnt.id,
        approved: data.approved[applicnt.id],
      };
    });

    const filterUnchangedApplicants = newApplicantData.filter((newDta, idx) => {
      const interestedOldObj = applicants.find(
        applicant => applicant.id === newDta.id
      );
      if (newDta.approved === interestedOldObj.approved) return;
      return newDta;
    });

    const updateData = {
      detailsStepComplete: true,
      applicants: {
        update: filterUnchangedApplicants.map(dta => ({
          data: {
            approved: dta.approved,
          },
          where: {
            id: dta.id,
          },
        })),
        // update: [{ data: {}, where: {id: } }],
      },
    };

    updateApplication({
      variables: {
        data: updateData,
        where: {
          id: rentalApplication.id,
        },
      },
    });
    // applicants to update => filterUnchangedOut
  };

  const formattedApplicants = applicants.map(a => ({
    ...a,
  }));

  const columns = [
    {
      field: 'url',
      title: 'Avatar',
      render: rowData => <UserProfile user={rowData.user} me={me} />,
    },
    { title: 'firstName', field: 'user.firstName', editable: false },
    { title: 'completed', field: 'completed', editable: false },
    {
      title: 'hasPreTenancyForm',
      field: 'preTenancyApplicationForm',
      editable: false,
      render: rowData => {
        if (rowData.preTenancyApplicationForm) {
          return 'YES';
        } else {
          return 'NO';
        }
      },
    },
    {
      field: 'approved',
      title: 'Approved',
      render: rowData => (
        <Switch
          aria-label="LoginSwitch"
          disabled={isOwner ? false : true} // only allow applicationOwner
          defaultChecked={rowData.approved}
          inputProps={{
            name: `approved[${rowData.id}]`,
            ref: register(),
          }}
        />
      ),
    },
  ];

  const refreshTableData = () => {
    refetch(); // actually refetching the entire rentalApplication...
    // maybe this is a thing for the actual rentalApplication where we have a button at the top somewhere that allows a refresh
  };

  if (completed) return <Typography>Section is completed</Typography>;
  if (refetching) return <Typography>Remaking Table</Typography>; // or the data doesnt get updated

  return (
    <div>
      {isOwner && (
        <>
          <Typography gutterBottom variant="body2">
            As the owner of the application you can approve applicants as part
            of your application. Approved applicants will be part of your
            application. You can approve a{' '}
            <Typography variant="body1" component="span" color="primary">
              maximum of {property.maximumOccupants} applicants.
            </Typography>{' '}
            Please make sure to submit the changed data at the bottom
          </Typography>
          <InviteUser
            message={`Signup to the Rehouser platform and join me in my rental application for the property ${property.location}`}
            subUrl={`/tenant/applications/${rentalApplication.id}`}
          />
        </>
      )}
      {isAnApplicant && !isOwner && (
        <Alert severity="info">
          <AlertTitle>You are an Applicant for this application.</AlertTitle>
          <Typography gutterBottom variant="body2">
            The application owner needs to edit this section to make you part of
            the application. You will need to complete the next section as the
            application owner cannot send an application whith approved
            applicants that do not have a pre tenancy form
          </Typography>
        </Alert>
      )}
      <Error error={error} />
      <SuperiorTable
        title="Application applicants"
        columns={columns}
        isLoading={refetching}
        data={formattedApplicants}
        options={{
          search: true,
          exportButton: false,
          exportAllData: false, // Flag for export all data instead of rendered data
          // filtering: true,
          grouping: false,
          // selection: true,
          sorting: true,
        }}
        actions={[
          {
            icon: 'refresh',
            tooltip: 'Refresh Data',
            isFreeAction: true,
            onClick: refreshTableData,
          },
        ]}
      />
      {/* <CustomChat
        // pageId="123456789"
        minimized={false}
        href={`http://www.facebook.com/rehousernz/${rentalApplication.id}`}
      />
      <Comments
        width="100%"
        style={{
          width: '100%',
        }}
        href={`http://www.facebook.com/rehousernz/${rentalApplication.id}`}
      /> */}
      <Button
        onClick={handleSubmit(onSubmit)}
        variant="outlined"
        disabled={isOwner ? false : true}
        color="primary">
        Update Applicants
      </Button>
    </div>
  );
};

ApplicationDetailsStep.propTypes = {
  completed: PropTypes.any,
  me: PropTypes.any,
  property: PropTypes.any,
  rentalApplication: PropTypes.shape({
    id: PropTypes.any,
  }).isRequired,
};

export default ApplicationDetailsStep;

// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import { useMutation } from '@apollo/client';
// import { UPDATE_RENTAL_GROUP_APPLICANT_MUTATION } from '../../../graphql/mutations/index';
// import { Typography } from '@material-ui/core';
// import Switch from '@material-ui/core/Switch';
// import SwitchInput from '../../Inputs/SwitchInput';
// import ApplicantDetails from '../../ApplicantDetails/index';
// import UserProfile from '../../UserProfile';
// import {
//   RENTAL_APPLICATIONS_QUERY,
//   SINGLE_RENTAL_APPLICATION_QUERY,
// } from '../../../graphql/queries/index';
// import Error from '../../ErrorMessage';
// import ChangeApplicationVisibilityBtn from '../../MutationButtons/ChangeApplicationVisibilityButton';

// import { useTheme } from '@material-ui/styles';

// const ConfirmApplicant = props => {
//   const { applicant, property, rentalApplication, completed } = props;
//   // ToDo: Mutation Props
//   const [updateApplicant, updateApplicantProps] = useMutation(
//     UPDATE_RENTAL_GROUP_APPLICANT_MUTATION,
//     {
//       variables: {
//         data: {
//           approved: !applicant.approved,
//           email: applicant.email,
//           firstName: applicant.firstName,
//         },
//         where: {
//           id: applicant.id,
//         },
//       },
//       optimisticResponse: {
//         __typename: 'Mutation',
//         updateRentalGroupApplicant: {
//           ...applicant,
//           __typename: 'RentalGroupApplicant',
//           id: applicant.id,
//           approved: !applicant.approved,
//         },
//       },
//       update: (proxy, payload) => {
//         const applicationData = proxy.readQuery({
//           query: SINGLE_RENTAL_APPLICATION_QUERY,
//           variables: {
//             where: { id: rentalApplication.id },
//           },
//         });

//         const applicantIndex = applicationData.rentalApplication.applicants.findIndex(
//           user => user.id === payload.data.updateRentalGroupApplicant.id
//         );

//         const updatedApplicants = [
//           ...applicationData.rentalApplication.applicants,
//         ];
//         updatedApplicants[applicantIndex] = {
//           ...applicationData.rentalApplication.applicants[applicantIndex],
//           ...payload.data.updateRentalGroupApplicant,
//         };

//         const newApplicationData = {
//           ...applicationData,
//           rentalApplication: {
//             ...applicationData.rentalApplication,
//             applicants: [...applicationData.rentalApplication.applicants],
//           },
//         };
//         proxy.writeQuery({
//           query: SINGLE_RENTAL_APPLICATION_QUERY,
//           variables: {
//             where: { id: rentalApplication.id },
//           },
//           data: newApplicationData,
//         });
//       },
//     }
//   );

//   return (
//     <div>
//       <Error error={updateApplicantProps.error} />
//       <SwitchInput
//         checked={applicant.approved}
//         onChange={updateApplicant}
//         label="Approve Applicant"
//         checkedLabel="Approved"
//       />
//     </div>
//   );
// };

// const RenderOwnerView = props => {
//   const { me, property, rentalApplication } = props;
//   return (
//     <div>
//       <h1>I am the application Details step </h1>
//       <StepInfo {...props} />
//       <ChangeApplicationVisibilityBtn
//         applicationId={rentalApplication.id}
//         visibility={rentalApplication.visibility}
//       />
//       <div
//         style={{
//           display: 'grid',
//         }}>
//         {rentalApplication.applicants.map((applicant, i) => {
//           return (
//             <div key={i}>
//               {applicant.user ? (
//                 <>
//                   <UserProfile user={applicant.user} me={me} />
//                   <ApplicantDetails applicant={applicant} />
//                 </>
//               ) : (
//                 'NO USER DETAILS'
//               )}

//               <ConfirmApplicant applicant={applicant} {...props} />
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// const RenderPlebView = props => {
//   const { rentalApplication } = props;
//   return (
//     <div>
//       <StepInfo {...props} />
//       Only the owner can edit this section. Here is the information
//       <h4>visibility: {rentalApplication.visibility}</h4>
//       <h4>Stage: {rentalApplication.stage}</h4>
//       <h4>finalised: {rentalApplication.finalised ? 'YES ' : 'NO'}</h4>
//     </div>
//   );
// };

// const StepInfo = ({ me, property, rentalApplication }) => {
//   const roomsAvailable = property.accommodation.length;
//   return (
//     <div>
//       <p>
//         There are {roomsAvailable} vacancies available, The creator of this
//         application can approve upto {roomsAvailable} before submitting the
//         application
//       </p>
//     </div>
//   );
// };

// const ApplicationDetailsStep = props => {
//   const { me, property, rentalApplication, applicantData, completed } = props;
//   if (completed) return <Typography>Step is complete</Typography>;
//   if (me.id !== rentalApplication.owner.id) {
//     return <RenderPlebView {...props} />;
//   }
//   return <RenderOwnerView {...props} />;
// };

// ApplicationDetailsStep.propTypes = {
//   me: PropTypes.object.isRequired,
//   property: PropTypes.shape({
//     carportSpaces: PropTypes.number,
//     garageSpaces: PropTypes.number,
//     highestRoomPrice: PropTypes.number,
//     imageUrls: PropTypes.arrayOf(PropTypes.string),
//     indoorFeature: PropTypes.arrayOf(PropTypes.string),
//     outdoorFeature: PropTypes.arrayOf(PropTypes.string),
//     location: PropTypes.string,
//     LocationLat: PropTypes.number,
//     locationLng: PropTypes.number,
//     moveInDate: PropTypes.string,
//     move_in_date_timestamp: PropTypes.number,
//     objectID: PropTypes.string,
//     offStreetSpaces: PropTypes.number,
//     onTheMarket: PropTypes.bool,
//     rent: PropTypes.number,
//     rooms: PropTypes.number,
//     type: PropTypes.string,
//     accommodation: PropTypes.arrayOf(
//       PropTypes.shape({
//         description: PropTypes.string,
//         expenses: PropTypes.number,
//         id: PropTypes.string,
//         rent: PropTypes.number,
//         roomSize: PropTypes.number,
//       })
//     ),
//   }),
//   rentalApplication: PropTypes.shape({
//     id: PropTypes.string,
//     finalised: PropTypes.bool,
//     applicants: PropTypes.arrayOf(
//       PropTypes.shape({
//         __typeName: PropTypes.string,
//         approved: PropTypes.bool,
//         completed: PropTypes.bool,
//         email: PropTypes.string,
//         firstName: PropTypes.sting,
//         id: PropTypes.string,
//         lastName: PropTypes.string,
//         user: PropTypes.shape(
//           PropTypes.shape({
//             id: PropTypes.string,
//             firsName: PropTypes.string,
//             lastName: PropTypes.string,
//           })
//         ),
//       })
//     ),
//   }),
//   applicantData: PropTypes.shape({
//     id: PropTypes.string,
//     approved: PropTypes.bool,
//     completed: PropTypes.bool,
//     email: PropTypes.string,
//     firstName: PropTypes.string,
//     __typename: PropTypes.string,
//     user: PropTypes.shape({
//       id: PropTypes.string,
//       firstName: PropTypes.string,
//       lastName: PropTypes.string,
//       __typename: PropTypes.string,
//     }),
//   }),
// };

// export default ApplicationDetailsStep;
