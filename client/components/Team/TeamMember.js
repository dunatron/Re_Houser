import { Paper, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Image from 'material-ui-image';
import PageHeader from '../PageHeader';

//icons
import PhoneIcon from '@material-ui/icons/Phone';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

import PropTypes from 'prop-types';
import mePropTypes from '../../propTypes/mePropTypes';

const useStyles = makeStyles(theme => ({
  root: {},
  descPanel: {
    display: 'flex',
    marginTop: '32px',
    flexWrap: 'wrap',
    [theme.breakpoints.up('md')]: {
      flexWrap: 'nowrap',
    },
  },
  imageWrapper: {
    maxWidth: '550px', // maybe we should have this
    minWidth: '320px',
    margin: 'auto',
    width: '90%',
    [theme.breakpoints.up('md')]: {
      margin: 'unset',
      width: '50%',
      maxWidth: 'unset',
    },
  },
  description: {
    // padding: '0 16px 16px 16px',
    padding: '32px 16px',
    width: '100%',
    maxWidth: '750px',
    margin: 'auto',
    [theme.breakpoints.up('md')]: {
      padding: '0 32px 32px 32px',
      width: 'unset',
      margin: 'unset',
    },
  },
  contactDetails: {
    fontSize: '22px',
  },
}));

const TeamMember = ({ member }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root} elevation={1} variant="elevation" square>
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
      <div className={classes.descPanel}>
        <div className={classes.imageWrapper}>
          <Image src={member.imgPath} />
        </div>
        <div className={classes.description}>
          {member.description}
          <div className={classes.contactDetails}>
            <Button color="secondary" startIcon={<PhoneIcon />}>
              {member.phone}
            </Button>
            <Button color="secondary" startIcon={<MailOutlineIcon />}>
              {member.email}
            </Button>
          </div>
        </div>
      </div>
    </Paper>
  );
};

TeamMember.propTypes = {
  member: PropTypes.shape({
    name: PropTypes.string,
    role: PropTypes.string,
    imgPath: PropTypes.string,
    description: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
  }),
};

export default TeamMember;
