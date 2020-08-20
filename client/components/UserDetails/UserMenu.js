import React, { Fragment, useState, useContext } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
// icons
import DeleteIcon from '../../styles/icons/DeleteIcon';
import FolderIcon from '@material-ui/icons/Folder';
import MoreVertIcon from '../../styles/icons/MoreVertIcon';
// graphql
import { CREATE_CHAT_MUTATION } from '../../graphql/mutations';
import { OPEN_CHAT_LOCAL_MUTATION } from '../../lib/store/resolvers';

// chat service
import { writeChat } from '../../services/cache.service';

// useContext
import { store } from '../../store';

const ITEM_HEIGHT = 48;

const handleLink = (route = '/', query = {}) => {
  Router.push({
    pathname: route,
    query: query,
  });
};

const UserMenu = ({ me, user }) => {
  const { state, dispatch } = useContext(store);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openChat] = useMutation(OPEN_CHAT_LOCAL_MUTATION);

  const openMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [createChat, createChatProps] = useMutation(CREATE_CHAT_MUTATION);

  if (!me) return 'No Me';

  return (
    <Fragment>
      <IconButton
        size="small"
        edge="end"
        aria-label="more"
        aria-controls="user-menu"
        aria-haspopup="true"
        onClick={openMenu}>
        <MoreVertIcon fontSize="small" />
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
        {createChatProps.loading ? (
          'loading'
        ) : (
          <MenuItem
            dense={true}
            onClick={e => {
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
                          id: user.id,
                        },
                      ],
                    },
                  },
                },
                update: (cache, { data: { createChat } }) => {
                  dispatch({
                    type: 'openChat',
                    payload: createChat,
                  });
                  setAnchorEl(null);
                },
              });
            }}>
            Message
          </MenuItem>
        )}
      </Menu>
    </Fragment>
  );
};

export default UserMenu;
