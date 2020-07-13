import TextFieldsIcon from '@material-ui/icons/TextFields';
import HomeWorkIcon from '@material-ui/icons/HomeWork';

const TENANT_DASHBOARD_CONFIG = [
  {
    label: 'Applications',
    route: '/applications',
    description: 'Review your rental applications',
    color: 'secondary',
    icon: <HomeWorkIcon />,
  },
  {
    label: 'Leases',
    route: '/leases',
    description: 'Review your leases',
    color: 'secondary',
    icon: <TextFieldsIcon />,
  },
];

export default TENANT_DASHBOARD_CONFIG;
