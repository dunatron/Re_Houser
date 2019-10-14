import React, { Fragment, useState } from 'react';
import {useMutation} from "@apollo/react-hooks";
import Router from 'next/router';
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
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
// icons
import DeleteIcon from '../../styles/icons/DeleteIcon';
import FolderIcon from '@material-ui/icons/Folder';
import MoreVertIcon from '../../styles/icons/MoreVertIcon';
// graphql
import { CREATE_CHAT_MUTATION } from '../../graphql/mutations';

// chat service
import { writeChat } from '../../services/cache.service';

const ITEM_HEIGHT = 48;

const handleLink = (route = '/', query = {}) => {
  Router.push({
    pathname: route,
    query: query,
  });
};

// 1. onClick we will do a createChat function.
// it will create a chat on the server and return the chat id.
// 2. we should create a little mini bar ike facebook does to hold our open chats
// maybe this should be a cache.service which will create a chat, whatever type it is and return the id etc, ensuring it is open in the chat bar

const UserMenu = ({ me, user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOptionClick = (event, option) => {
    if (option.action) {
      option.action();
    }
    handleClose();
  };

  const openMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [createChat, createChatProps] = useMutation(CREATE_CHAT_MUTATION);
  const USER_MENU_OPTIONS = [
    {
      label: 'Message',
      action: () => {
        createChat({
          variables: {
            data: {
              name: 'CHat room 0',
              type: 'PEER',
              participants: {
                connect: [
                  {
                    id: me.id,
                  },
                  {
                    id: user.id
                  }
                ],
              },
            },
          },
        })
        // CREATE_CHAT_MUTATION
      },
    },
  ];
  return (
    <Fragment>
      <IconButton
        edge="end"
        aria-label="more"
        aria-controls="user-menu"
        aria-haspopup="true"
        onClick={openMenu}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: 200,
          },
        }}>
        {USER_MENU_OPTIONS.map((option, i) => (
          <MenuItem
            key={i}
            selected={option === 'Pyxis'}
            onClick={e => handleOptionClick(e, option)}>
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </Fragment>
  );
};

export default UserMenu;
