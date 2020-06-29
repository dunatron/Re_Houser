import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
// components
import UserMenu from './UserMenu';
// icons
import DeleteIcon from '../../styles/icons/DeleteIcon';
import FolderIcon from '@material-ui/icons/Folder';
import MoreVertIcon from '../../styles/icons/MoreVertIcon';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const UserDetails = ({ me, user }) => {
  const fullname = user.firstName + ' ' + user.lastName;
  return (
    <Fragment>
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
      <Divider variant="inset" component="li" />
    </Fragment>
  );
  // return (
  //   <Fragment>
  //     <ListItem>
  //       <ListItemAvatar>
  //         <Avatar
  //           alt={fullname}
  //           src={user.profilePhoto ? user.profilePhoto.url : null}
  //         />
  //       </ListItemAvatar>
  //       <ListItemText primary={fullname} secondary={'Friend'} />
  //       <ListItemSecondaryAction>
  //         <UserMenu me={me} user={user} />
  //       </ListItemSecondaryAction>
  //     </ListItem>
  //     <Divider variant="inset" component="li" />
  //   </Fragment>
  // );
};

export default UserDetails;
