// icons
import PersonIcon from '../../styles/icons/PersonIcon';
import DashboardIcon from '../../styles/icons/DashboardIcon';
import LocationSearchingIcon from '../../styles/icons/LocationSearchingIcon';
import AccountCircleIcon from '../../styles/icons/AccountCircleIcon';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import HouseIcon from '@material-ui/icons/House';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ApartmentIcon from '@material-ui/icons/Apartment';
import DonutSmallIcon from '@material-ui/icons/DonutSmall';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import AddIcon from '@material-ui/icons/Add';
import MoneyIcon from '@material-ui/icons/Money';

const LANDLORD_DASHBOARD_CONFIG = [
  {
    icon: <HomeWorkIcon />,
    label: 'Free Appraisal',
    route: '/landlord/appraisals',
    description: 'Land lord appraisals',
    color: 'secondary',
    requiresLogin: false,
  },
  {
    icon: <AddIcon />,
    label: 'Add Property',
    route: '/landlord/properties/add',
    description: 'Add property to the platform',
    color: 'secondary',
    requiresLogin: true,
  },
  {
    icon: <HouseIcon />,
    label: 'Properties',
    route: '/landlord/properties',
    description:
      'Review your properties. This is where you can accept applications for your property and do general management for your property',
    color: 'secondary',
    requiresLogin: true,
  },
  {
    icon: <MoneyIcon />,
    label: 'Fees',
    route: '/landlord/fees',
    description: 'Review the rehouser fees for the system',
    color: 'secondary',
    requiresLogin: false,
  },
  {
    icon: <MoneyIcon />,
    label: 'Terms of engagement',
    route: '/landlord/terms-of-engagement',
    description: 'Review the terms of engagement for using our system',
    color: 'secondary',
  },
  // {
  //   icon: <ApartmentIcon />,
  //   label: 'Leases',
  //   route: '/leases',
  //   description: 'Review your leases for your properties',
  //   color: 'secondary',
  // },
];

export default LANDLORD_DASHBOARD_CONFIG;
