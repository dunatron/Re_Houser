import { makeStyles } from '@material-ui/core/styles';
import Alert from '@/Components/Alert';

import {
  Avatar,
  Typography,
  CardHeader,
  Paper,
  Button,
  Box,
  ButtonGroup,
} from '@material-ui/core';

//icons
import PhoneIcon from '@material-ui/icons/Phone';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    maxWidth: '500px',
    margin: '0 auto',
  },
  avatar: {
    width: theme.spacing(32),
    height: theme.spacing(32),
    margin: '0 auto',
  },
  title: {
    flexBasis: '100%',
    fontSize: '1.8em',
    margin: theme.spacing(2, 1),
    textAlign: 'center',
  },
  phone: { textAlign: 'center' },
  email: { textAlign: 'center' },
  rehouserStamp: {
    margin: theme.spacing(1),
  },
  buttons: {
    // flexBasis: '100%',
    margin: '0 auto',
  },
}));

export default function FullPublicDetails({ user }) {
  const classes = useStyles();
  const fullName = `${user.firstName} ${user.lastName}`;
  const hasStamp = user.rehouserStamp;
  return (
    <div className={classes.root}>
      <Avatar
        className={classes.avatar}
        src={user.profilePhoto ? user.profilePhoto.url : null}
        alt={`image of ${fullName}`}
      />
      <Typography className={classes.title}>{fullName}</Typography>
      <ButtonGroup orientation="vertical" className={classes.buttons}>
        <Button startIcon={<PhoneIcon />} className={classes.phone}>
          {user.phone}
        </Button>
        <Button startIcon={<MailOutlineIcon />} className={classes.email}>
          {user.email}
        </Button>
      </ButtonGroup>

      <div className={classes.rehouserStamp}>
        {hasStamp && (
          <Alert severity="success">
            <Typography className={classes.rehouserStamp}>
              This User has been looked over by rehouser and confirmed that they
              are who they say they are
            </Typography>
          </Alert>
        )}
        {!hasStamp && (
          <>
            <Alert severity="info">
              <Typography className={classes.rehouserStamp} gutterBottom>
                This User is still to recieve the rehouser stamp. This means
                that that they have not yet been validated
              </Typography>
              <Typography className={classes.rehouserStamp} gutterBottom>
                We usually validate users after a rental application has been
                submitted
              </Typography>
            </Alert>
          </>
        )}
      </div>
    </div>
  );
}
