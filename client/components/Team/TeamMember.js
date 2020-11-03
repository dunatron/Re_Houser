import { Paper, Typography, Button, CardMedia } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Image from 'material-ui-image';
import PageHeader from '@/Components/PageHeader';
import FlexLayout from '@/Styles/layouts/FlexLayout';
import Card from '@/Styles/Card';

//icons
import PhoneIcon from '@material-ui/icons/Phone';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

import PropTypes from 'prop-types';
import mePropTypes from '../../propTypes/mePropTypes';

const useStyles = makeStyles(theme => ({
  root: {},
  descPanel: {
    display: 'flex',
    flexWrap: 'wrap',
    [theme.breakpoints.up('md')]: {
      flexWrap: 'nowrap',
    },
  },
  imageWrapper: {
    maxWidth: '550px', // maybe we should have this
    minWidth: '320px',

    // marginRight: 'auto',
    // marginLeft: 'auto',
    [theme.breakpoints.up('md')]: {
      width: '50%',
      maxWidth: 'unset',
    },
  },
  description: {
    // padding: '0 16px 16px 16px',
    padding: '32px 16px',
    width: '100%',
    maxWidth: '750px',
    // marginRight: 'auto',
    // marginLeft: 'auto',
    [theme.breakpoints.up('md')]: {
      padding: '0 32px 32px 32px',
      width: 'unset',
    },
  },
  contactDetails: {
    fontSize: '22px',
  },
}));

const TeamMember = ({ member }) => {
  const classes = useStyles();
  return (
    <div className={classes.root} elevation={1} variant="elevation">
      <Card>
        <PageHeader
          titleOverride={
            <Typography align="center" variant="h1" component="h1">
              {member.name}
            </Typography>
          }
          metaData={{
            title: `${member.name} - ${member.name}`,
            content: `${member.name} - ${member.name}`,
          }}
        />
        <Typography align="center" variant="h2" component="h2">
          {member.role}
        </Typography>
      </Card>

      <FlexLayout className={classes.descPanel}>
        <Card className={classes.imageWrapper} disablePadding>
          <Image
            style={{ height: '100%' }}
            src={member.imgPath}
            className={classes.image}
            cover={false}
          />
        </Card>
        <Card className={classes.description}>
          {member.description}
          <div className={classes.contactDetails}>
            <Button color="secondary" startIcon={<PhoneIcon />}>
              {member.phone}
            </Button>
            <Button color="secondary" startIcon={<MailOutlineIcon />}>
              {member.email}
            </Button>
          </div>
        </Card>
      </FlexLayout>
    </div>
  );
};

TeamMember.propTypes = {
  member: PropTypes.shape({
    description: PropTypes.string,
    email: PropTypes.string,
    imgPath: PropTypes.string,
    name: PropTypes.string,
    phone: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
};

export default TeamMember;
