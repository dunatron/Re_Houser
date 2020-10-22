import MoneyIcon from '@material-ui/icons/Money';
import AssignmentIcon from '@material-ui/icons/Assignment';
import GroupIcon from '@material-ui/icons/Group';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';

const LEGAL_STATMENTS_DASHBOARD_CONFIG = [
  {
    label: 'Privacy Policy',
    route: '/legal/privacy-policy',
    description: 'Our Privacy Policy',
    color: 'secondary',
    icon: <GroupIcon />,
  },
  {
    label: 'Terms of Engagement',
    route: '/legal/terms-of-engagement',
    description: 'Our Terms of Engagement',
    color: 'secondary',
    icon: <GroupIcon />,
  },
];

export default LEGAL_STATMENTS_DASHBOARD_CONFIG;
