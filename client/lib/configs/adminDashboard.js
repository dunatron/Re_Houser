import TextFieldsIcon from '@material-ui/icons/TextFields';
import HomeWorkIcon from '@material-ui/icons/HomeWork';

const ADMIN_DASHBOARD_CONFIG = [
  {
    label: 'Appraisals',
    route: '/admin/appraisals',
    description: 'Review system appraisals',
    color: 'primary',
    icon: <HomeWorkIcon />,
  },
  {
    label: 'Typography',
    route: '/admin/typography',
    description: 'Review system typography',
    color: 'primary',
    icon: <TextFieldsIcon />,
  },
];

export default ADMIN_DASHBOARD_CONFIG;
