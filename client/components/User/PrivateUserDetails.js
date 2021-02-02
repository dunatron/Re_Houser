import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { PRIVATE_USER_QUERY } from '@/Gql/queries';
import Loader from '@/Components/Loader';
import Error from '@/Components/ErrorMessage';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@/Components/Alert';

import Container from '@/Components/Container';
import Section from '@/Components/Section';

import PublicDetailsDisplay from './PublicDetailsDisplay';
import PrivateDetailsDisplay from './PrivateDetailsDisplay';

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
    // padding: theme.spacing(1), pass in param if you want this
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

export default function PublicUserDetails({ id, email }) {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);

  const { data, loading, error } = useQuery(PRIVATE_USER_QUERY, {
    variables: {
      where: {
        // id: id,
        ...(id && { id: id }),
        ...(email && { email: email }),
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
        text={`loading in private user details for ${id}`}
      />
    );
  if (error) return <Error error={error} />;

  if (!data.user) return <div>No User data Available</div>;

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
        title={`${fullName} profile`}>
        <FullUserDetails user={data.user} />
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

const FullUserDetails = ({ user }) => {
  const classes = useModalStyles();
  const fullName = `${user.firstName} ${user.lastName}`;
  const hasStamp = user.rehouserStamp;
  return (
    <div className={classes.root}>
      <Container>
        <PublicDetailsDisplay user={user} />
        <PrivateDetailsDisplay user={user} />
      </Container>
    </div>
  );
};
// firstName
// lastName
// phone
// email
// rehouserStamp
