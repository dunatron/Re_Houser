import PropTypes from 'prop-types';
import { useContext } from 'react';
import { store } from '@Store';

import Dashboard from '@Components/Dashboard';
import PageHeader from '@Components/PageHeader';

//material
import { Badge } from '@material-ui/core';

import TextFieldsIcon from '@material-ui/icons/TextFields';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import SettingsIcon from '@material-ui/icons/Settings';
import FriendManager from '@Components/FriendManager';

import AdminOnly from '@Components/AdminOnly';

/**
 *
 * I have a dream, to put all my updates here for admins.
 * except it wont work here. needs to be on the page root
 */
const AdminDashboardPage = ({ appData: { currentUser } }) => {
  const me = currentUser.data ? currentUser.data.me : null;
  const globalStore = useContext(store);
  const { dispatch, state } = globalStore;

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
      label: 'Inspections',
      route: '/admin/inspections',
      description: 'View allinspections on the system',
      color: 'secondary',
      icon: <HomeWorkIcon />,
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
    {
      label: 'Security statement',
      route: '/admin/security-statement',
      description: 'View our security statement',
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
      <AdminOnly me={me}>
        <Dashboard config={ADMIN_DASHBOARD_CONFIG} />
        <FriendManager />
      </AdminOnly>
    </div>
  );
};

AdminDashboardPage.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object.isRequired,
  }),
};

export default AdminDashboardPage;
