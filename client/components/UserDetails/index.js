import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
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
  return (
    <Fragment>
      <ListItem>
        <ListItemAvatar>
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
        </ListItemAvatar>
        <ListItemText primary="Username" secondary={'Friend'} />
        <ListItemSecondaryAction>
          <UserMenu me={me} user={user} />
        </ListItemSecondaryAction>
      </ListItem>
      <Divider variant="inset" component="li" />
    </Fragment>
  );
};

export default UserDetails;
