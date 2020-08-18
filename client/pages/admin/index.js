// import PropertyDetails from "../../components/PropertyDetails/index"
import { useContext } from 'react';
import { store } from '../../store';

import LeasesList from '../../components/LeasesList';
import PleaseSignIn from '../../components/PleaseSignIn';
import Dashboard from '../../components/Dashboard';
import PageHeader from '../../components/PageHeader';

//material
import { Badge } from '@material-ui/core';

import TextFieldsIcon from '@material-ui/icons/TextFields';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import SettingsIcon from '@material-ui/icons/Settings';
import FriendManager from '../../components/FriendManager';

/**
 *
 * I have a dream, to put all my updates here for admins.
 * except it wont work here. needs to be on the page root
 */
const MyLeasePage = props => {
  const globalStore = useContext(store);
  const { dispatch, state } = globalStore;
  const {
    appData: { currentUser },
  } = props;
  const ADMIN_DASHBOARD_CONFIG = [
    {
      label: 'Appraisals',
      route: '/admin/appraisals',
      description: 'Review system appraisals',
      color: 'secondary',
      icon: (
        <Badge badgeContent={state.newRentalAppraisalCount} color="primary">
          <HomeWorkIcon />
        </Badge>
      ),
    },
    {
      label: 'Rental Applications',
      route: '/admin/applications',
      description: 'View all rental applications currently in the system',
      color: 'secondary',
      icon: (
        <Badge badgeContent={state.newRentalApplicationsCount} color="primary">
          <HomeWorkIcon />
        </Badge>
      ),
    },
    {
      label: 'Properties',
      route: '/admin/properties',
      description: 'View all properties on the system',
      color: 'secondary',
      icon: (
        <Badge badgeContent={state.newPropertiesCount} color="primary">
          <HomeWorkIcon />
        </Badge>
      ),
    },
    {
      label: 'Typography',
      route: '/admin/typography',
      description: 'Review system typography',
      color: 'secondary',
      icon: <TextFieldsIcon />,
    },
    {
      label: 'Admin Settings',
      route: '/admin/settings',
      description: 'Subscribe to system events',
      color: 'secondary',
      icon: <SettingsIcon />,
    },
  ];
  return (
    <div>
      <PageHeader
        title="Admin Portal"
        metaData={{
          title: 'Admin portal',
          content:
            'Admin portal to manage rehouser clients and day to day activities',
        }}
      />
      <PleaseSignIn
        currentUser={currentUser}
        message="You must be signed in to view the admin area">
        <Dashboard config={ADMIN_DASHBOARD_CONFIG} />
        <FriendManager />
      </PleaseSignIn>
    </div>
  );
};
export default MyLeasePage;
