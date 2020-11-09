import { Badge } from '@material-ui/core';

import TextFieldsIcon from '@material-ui/icons/TextFields';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import SettingsIcon from '@material-ui/icons/Settings';

const ADMIN_DASHBOARD_CONFIG = ({ state }) => [
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
    label: 'Legal Statements',
    route: '/legal',
    description:
      'View our Legal Statements such as our Privacy Policy and Terms of Engagement',
    color: 'secondary',
    icon: <SettingsIcon />,
  },
  {
    label: 'Users List',
    route: '/admin/users',
    description: 'View all of our users and update things such as permissions',
    color: 'secondary',
    icon: <SettingsIcon />,
  },
  {
    label: 'Test Crashes',
    route: '/admin/test/server-crashes',
    description: 'Run server crashes',
    color: 'secondary',
    icon: <SettingsIcon />,
  },
];

export default ADMIN_DASHBOARD_CONFIG;
