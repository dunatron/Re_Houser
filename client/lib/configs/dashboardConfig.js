import HomeWorkIcon from '@material-ui/icons/HomeWork';
import HouseIcon from '@material-ui/icons/House';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ApartmentIcon from '@material-ui/icons/Apartment';
import DonutSmallIcon from '@material-ui/icons/DonutSmall';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import AccountCircleIcon from '../../styles/icons/AccountCircleIcon';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const DASHBOARD_CONFIG = [
  {
    label: 'activity',
    route: '/activity',
    description: 'Review your latest activity',
    color: 'secondary',
    icon: <DonutSmallIcon />,
  },
  {
    label: 'applications',
    route: '/applications',
    description:
      'Here you can review your applications. You can search and filter by various data to stay up to date with your applications',
    color: 'secondary',
    icon: <AssignmentIcon />,
  },
  {
    label: 'Properties',
    route: '/properties',
    description:
      'As a property owner you can view and manage all of your properties from here',
    color: 'secondary',
    icon: <HouseIcon />,
  },
  {
    label: 'Leases',
    route: '/leases',
    description: 'Any leases to sign and manage will be found here',
    color: 'secondary',
    icon: <ApartmentIcon />,
  },
  {
    label: 'Add Property',
    route: '/properties/add',
    description:
      'Add Properties for renting. This is where we collect information about your rental before adding it to your profile',
    color: 'secondary',
    icon: <AddCircleOutlineIcon />,
  },
  {
    label: 'Account',
    route: '/account',
    description:
      'Manage your Re_Houser account. filling out these details early will make using the rest of the app painless',
    color: 'secondary',
    icon: <AccountCircleIcon />,
  },
];

export default DASHBOARD_CONFIG;
