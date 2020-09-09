import React from 'react';
import {
  ListItem,
  ListItemSecondaryAction,
  Avatar,
  ListItemText,
  ListItemAvatar,
} from '@material-ui/core';

// components
import UserMenu from './UserMenu';

import PropTypes from 'prop-types';
import { mePropTypes, filePropTypes } from '../../propTypes';

const UserDetails = ({ me, user }) => {
  const fullname = user.firstName + ' ' + user.lastName;
  return (
    <ListItem dense={true}>
      <ListItemAvatar dense={true}>
        <Avatar
          alt={fullname}
          src={user.profilePhoto ? user.profilePhoto.url : null}
        />
      </ListItemAvatar>
      <ListItemText primary={fullname} secondary={'Friend'} dense={true} />
      <ListItemSecondaryAction>
        <UserMenu me={me} user={user} />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

UserDetails.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    profilePhoto: filePropTypes,
  }),
  me: mePropTypes,
};

export default UserDetails;
