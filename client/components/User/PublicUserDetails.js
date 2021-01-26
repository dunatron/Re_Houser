import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { PUBLIC_USER_QUERY } from '@/Gql/queries';
import Loader from '@/Components/Loader';
import Error from '@/Components/ErrorMessage';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

import {
  Avatar,
  Typography,
  CardHeader,
  Paper,
  Button,
  Box,
  ButtonGroup,
} from '@material-ui/core';

import Modal from '@/Components/Modal';
//icons
import PhoneIcon from '@material-ui/icons/Phone';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const useStyles = makeStyles(theme => ({
  card: {
    // backgroundColor: 'red',
    // maxWidth: '280px',
    width: 'fit-content',
    display: 'flex',
    padding: theme.spacing(1),
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  name: {},
  content: {
    alignItems: 'left',
    display: 'flex',
    flexDirection: 'column',
  },
}));

export default function PublicUserDetails({ id }) {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);

  const { data, loading, error } = useQuery(PUBLIC_USER_QUERY, {
    variables: {
      where: {
        id: id,
      },
    },
  });

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  console.log('Goy public user details ', data);

  if (loading)
    return (
      <Loader
        loading={loading}
        text={`loading in public user details for ${id}`}
      />
    );
  if (error) return <Error error={error} />;

  if (!data.user) return <div>No Public User data Available</div>;

  const fullName = `${data.user.firstName} ${data.user.lastName}`;

  return (
    <>
      <Paper className={classes.card} elevation={0}>
        <Avatar
          onClick={handleOpenModal}
          sizes="l"
          className={classes.avatar}
          src={data.user.profilePhoto ? data.user.profilePhoto.url : null}
          alt={`image of ${fullName}`}
        />
        <Box className={classes.content}>
          <Typography className={classes.name} gutterBottom>
            {data.user.firstName} {data.user.lastName}
          </Typography>
          <Button className={classes.name} variant="outlined">
            {data.user.email}
          </Button>
        </Box>
      </Paper>
      <Modal
        open={modalOpen}
        close={handleCloseModal}
        title={`${fullName} public profile`}>
        <FullPublicDetails user={data.user} />
      </Modal>
    </>
  );
}

const useModalStyles = makeStyles(theme => ({
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

const FullPublicDetails = ({ user }) => {
  const classes = useModalStyles();
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
};
// firstName
// lastName
// phone
// email
// rehouserStamp
