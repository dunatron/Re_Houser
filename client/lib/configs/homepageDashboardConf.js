import MoneyIcon from '@material-ui/icons/Money';
import AssignmentIcon from '@material-ui/icons/Assignment';
import GroupIcon from '@material-ui/icons/Group';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';

const HOME_PAGE_DASHBOARD_CONFIG = [
  // {
  //   label: 'Fees',
  //   route: '/info/fees',
  //   description: 'Details about our fees',
  //   color: 'secondary',
  //   icon: <MoneyIcon />,
  // },
  {
    label: 'About Us',
    route: '/about-us',
    description: 'Meet the rehouser team',
    color: 'secondary',
    icon: <GroupIcon />,
  },
  {
    label: 'Contact',
    route: '/info/contact',
    description: 'All info about anyway you could want to contact us',
    color: 'secondary',
    icon: <ContactPhoneIcon />,
  },
  {
    label: 'Landlorld',
    route: '/info/landlord',
    description: 'Information concerning landlords',
    color: 'secondary',
    icon: <AssignmentIcon />,
  },
  {
    label: 'Tenant',
    route: '/info/tenant',
    description: 'Information concerning tenants',
    color: 'secondary',
    icon: <AssignmentIcon />,
  },
];

export default HOME_PAGE_DASHBOARD_CONFIG;
