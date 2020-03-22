import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Tooltip, Typography } from '@material-ui/core';
import Modal from '../Modal';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const UserProfile = ({ user, me }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const classes = useStyles();
  const title =
    user.id === me.id
      ? 'Your Public Profile'
      : `${user.firstName} ${user.lastName}`;
  return (
    <>
      <Modal
        open={modalIsOpen}
        close={() => setModalIsOpen(false)}
        fullscreen={false}
        title={`${user.firstName} ${user.lastName}`}
        id={`user-profile-modal${user.id}`}>
        <p>The user profile</p>
        <Typography>
          {user.firstName} {user.lastName}
        </Typography>
        <Typography>{user.email}</Typography>
      </Modal>
      <div className={classes.root}>
        <Tooltip title={title}>
          <Avatar
            onClick={() => setModalIsOpen(true)}
            alt={title}
            src={user.profilePhoto ? user.profilePhoto.url : null}
          />
        </Tooltip>
      </div>
    </>
  );
};

export default UserProfile;
