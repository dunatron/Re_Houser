import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/client';

// gql queries/mutations
import { CURRENT_USER_QUERY } from '../../graphql/queries/index';

// material-ui
import { AppBar, Tabs, Tab } from '@material-ui/core';

// Icons
import EditIcon from '../../styles/icons/EditIcon';
import MoreIcon from '../../styles/icons/MoreIcon';
import DetailsIcon from '../../styles/icons/DetailsIcon';
import CameraIcon from '../../styles/icons/CameraIcon';
import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined';
import CameraOutlinedIcon from '@material-ui/icons/CameraOutlined';
import CameraFrontOutlinedIcon from '@material-ui/icons/CameraFrontOutlined';
import PaymentIcon from '@material-ui/icons/Payment';
import ChangeRouteButton from '../Routes/ChangeRouteButton';

// components
import Loader from '../Loader';
import Error from '../ErrorMessage';

import TabContainer from './TabContainer';
// Tabs
import DetailsTab from './tabs/DetailsTab';
import ProfilePhotoTab from './tabs/ProfilePhotoTab';
import PhotoIdTab from './tabs/PhotoIdTab';
import SettingsTab from './tabs/SettingsTab';

function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    'aria-controls': `wrapped-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    // flexGrow: 1,
    // backgroundColor: theme.palette.background.paper,
  },
}));

export default function TabsWrappedLabel() {
  const tabOneVal = 'details-tab';
  const tabTwoVal = 'profile-photo-tab';
  const tabThreeVal = 'photo-id-tab';
  const tabFourVal = 'settings-tab';
  const classes = useStyles();
  const [value, setValue] = React.useState(tabOneVal);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { data, loading, error } = useQuery(CURRENT_USER_QUERY);

  if (loading) return <Loader loading={loading} />;
  if (error) return <Error error={error} />;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="wrapped label tabs example">
          <Tab
            wrapped
            label="Personal Details"
            icon={<DetailsIcon />}
            value={tabOneVal}
            {...a11yProps(tabOneVal)}
          />
          <Tab
            wrapped
            value={tabTwoVal}
            label="Profile Photo"
            icon={<PhotoCameraOutlinedIcon />}
            {...a11yProps(tabTwoVal)}
          />
          <Tab
            wrapped
            value={tabThreeVal}
            label="Photo Identification"
            icon={<PhotoCameraOutlinedIcon />}
            {...a11yProps(tabThreeVal)}
          />
          <Tab
            wrapped
            value={tabFourVal}
            label="Settings"
            icon={<PaymentIcon />}
            {...a11yProps(tabFourVal)}
          />
        </Tabs>
      </AppBar>
      {/* TAB CONTAINERS */}
      <TabContainer value={value} index={tabOneVal}>
        <DetailsTab me={data.me} />
      </TabContainer>
      <TabContainer value={value} index={tabTwoVal}>
        <ProfilePhotoTab me={data.me} />
      </TabContainer>
      <TabContainer value={value} index={tabThreeVal}>
        <PhotoIdTab me={data.me} />
      </TabContainer>
      <TabContainer value={value} index={tabFourVal}>
        <SettingsTab me={data.me} />
      </TabContainer>
    </div>
  );
}

// import React, { useState } from 'react';
// import { useQuery, useMutation } from '@apollo/client';
// import { isEmpty, equals } from 'ramda';
// import styled from 'styled-components';

// import { UPDATE_USER_MUTATION } from '../../graphql/mutations/index';
// import { CURRENT_USER_QUERY } from '../../graphql/queries/index';
// // configs
// import { USER_PROFILE_CONF } from '../../lib/configs/userProfileConfig';
// import { withStyles, makeStyles } from '@material-ui/core/styles';
// // components
// // swiping tabs
// import SwipeableViews from 'react-swipeable-views';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// // completion rating
// import CompletionRating from './CompletionRating';
// // CompletionIcon
// import DynamicCompletionIcon from './CompletionIcon';
// // user profile
// import UserProfile from '../UserProfile';
// // PhotoIdentification
// import PhotoIdentification from './PhotoIdentification';
// // ProfilePhoto
// import UploadProfilePhoto from './UploadProfilePhoto';
// import TabContainer from './TabContainer';
// // import TextInput from "../../styles/TextInput"
// import TextField from '@material-ui/core/TextField';
// // Credit card tab
// import CreditCardTab from './CreditCardTab';
// import SaveButtonLoader from '../Loader/SaveButtonLoader';
// // Delete Account
// import DeleteAccount from './DeleteAccount';

// //Errors
// import ErrorMessage from '../ErrorMessage';
// import { PDFViewer } from '@react-pdf/renderer';
// import TestPdf from '../Pdfs/TestPdf';

// // Icons
// import EditIcon from '../../styles/icons/EditIcon';
// import MoreIcon from '../../styles/icons/MoreIcon';
// import DetailsIcon from '../../styles/icons/DetailsIcon';
// import CameraIcon from '../../styles/icons/CameraIcon';
// import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined';
// import CameraOutlinedIcon from '@material-ui/icons/CameraOutlined';
// import CameraFrontOutlinedIcon from '@material-ui/icons/CameraFrontOutlined';
// import PaymentIcon from '@material-ui/icons/Payment';
// import ChangeRouteButton from '../Routes/ChangeRouteButton';

// const useStyles = makeStyles(theme => ({
//   inputGrid: {
//     display: 'grid',
//     gridGap: '32px',
//     width: '100%',
//     padding: '16px',
//     [theme.breakpoints.up('sm')]: {
//       gridTemplateColumns: '1fr 1fr',
//     },
//     [theme.breakpoints.up('md')]: {
//       gridTemplateColumns: '1fr 1fr 1fr ',
//     },
//     [theme.breakpoints.up('lg')]: {
//       gridTemplateColumns: '1fr 1fr 1fr 1fr',
//     },
//   },
//   textField: {
//     fontSize: '32px',
//   },
// }));

// const StyledInput = withStyles({
//   root: {},
//   formControl: {},
//   label: {
//     textTransform: 'uppercase',
//     fontSize: '18px',
//   },
//   textField: {
//     fontSize: '32px',
//   },
// })(TextField);

// const AccountComponent = () => {
//   const classes = useStyles();
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [tabIndex, setTabIndex] = useState(0);

//   const user = useQuery(CURRENT_USER_QUERY);
//   const [updateUser, updateUserProps] = useMutation(UPDATE_USER_MUTATION);

//   // updates for user mutation
//   const [updates, setUpdates] = useState({});

//   const saveToUpdates = e => {
//     setUpdates({ ...updates, [e.target.name]: e.target.value });
//   };
//   const _updateUser = async () => {
//     const res = await updateUser({
//       variables: {
//         data: {
//           ...updates,
//         },
//       },
//       refetchQueries: [{ query: CURRENT_USER_QUERY }],
//     });
//     if (res.data) {
//       setUpdates({});
//     }
//     closeModal();
//   };
//   const closeModal = () => {
//     setModalIsOpen(false);
//   };
//   const openModal = () => {
//     setModalIsOpen(true);
//   };
//   const handleTabChange = (event, value) => {
//     setTabIndex(value);
//   };
//   const handleChangeIndex = index => {
//     setTabIndex(index);
//   };
//   const update = (cache, payload) => {};

//   const canSave = () => {
//     if (isEmpty(updates)) return false;
//     return true;
//   };

//   if (user.loading) {
//     return 'Loading';
//   }
//   if (user.error) {
//     return 'error: ToDo: use error component';
//   }
//   const me = user.data.me;
//   if (!me) return null;
//   return (
//     <div>
//       {canSave() && (
//         <div
//           style={{
//             position: 'fixed',
//             bottom: '16px',
//             right: '16px',
//             zIndex: 10,
//           }}>
//           <SaveButtonLoader
//             loading={updateUserProps.loading}
//             onClick={() => {
//               _updateUser();
//             }}
//           />
//         </div>
//       )}

//       <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
//         <ChangeRouteButton
//           route="/account/signature"
//           title="Set Signature"
//           variant="outlined"
//         />
//         <DeleteAccount />
//       </div>
//       <CompletionRating me={me} />

//       <UserProfile user={me} me={me} />

//       <Tabs
//         style={{
//           flex: '1 1 100%',
//           minHeight: 0,
//           display: 'flex',
//           flexDirection: 'column',
//         }}
//         contentContainerStyle={{
//           flex: '1 1 100%;',
//           display: 'flex',
//           flexDirection: 'column',
//           overflowY: 'auto',
//         }}
//         value={tabIndex}
//         onChange={handleTabChange}
//         indicatorColor="primary"
//         textColor="primary"
//         variant="fullWidth">
//         <Tab
//           wrapped
//           label="Personal Details"
//           icon={<DetailsIcon />}
//           value={tabIndex}
//         />
//         <Tab
//           wrapped
//           label="Photo Identification"
//           icon={<PhotoCameraOutlinedIcon />}
//         />
//         <Tab wrapped label="Profile Photo" icon={<CameraOutlinedIcon />} />
//         <Tab wrapped label="Payment Methods" icon={<PaymentIcon />} />
//       </Tabs>
//       <TabContainer>
//         <h4>UserID => {me.id}</h4>
//         <ErrorMessage error={updateUserProps.error} />
//         <div className={classes.inputGrid}>
//           {USER_PROFILE_CONF.map(item => {
//             return (
//               <div>
//                 <DynamicCompletionIcon val={me[item.variableName]} />
//                 <StyledInput
//                   className={classes.textField}
//                   fullWidth={true}
//                   label={item.label}
//                   name={item.variableName}
//                   // value={me[item.variableName]}
//                   defaultValue={me[item.variableName]}
//                   onChange={saveToUpdates}></StyledInput>
//               </div>
//             );
//           })}
//         </div>
//       </TabContainer>
//       <TabContainer
//         containerStyles={{
//           justifyContent: 'center',
//           flexWrap: 'wrap',
//         }}>
//         <PhotoIdentification
//           me={me}
//           updateVariable={(name, val) => {
//             setUpdates({
//               ...updates,
//               [name]: val,
//             });
//           }}
//         />
//       </TabContainer>
//       <TabContainer
//         containerStyles={{
//           justifyContent: 'center',
//           flexWrap: 'wrap',
//         }}>
//         <UploadProfilePhoto me={me} />
//       </TabContainer>
//       <TabContainer>
//         <CreditCardTab me={me} />
//       </TabContainer>

//       <TestPdf me={me} />
//     </div>
//   );
// };

// export default AccountComponent;
