import React, { Fragment, useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import Router from 'next/router';
import IconButton from '@material-ui/core/IconButton';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
// icons
import MoreVertIcon from '@/Styles/icons/MoreVertIcon';
// graphql
import { CREATE_CHAT_MUTATION } from '@/Gql/mutations';
import { OPEN_CHAT_LOCAL_MUTATION } from '@/Lib/store/resolvers';

// chat service
import { writeChat } from '../../services/cache.service';

// useContext
import { store } from '@/Store/index';

import PropTypes from 'prop-types';
import mePropTypes from '../../propTypes/mePropTypes';

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

UserMenu.propTypes = {
  me: mePropTypes,
  user: PropTypes.shape({
    id: PropTypes.string.isRequiredP,
  }),
};

export default UserMenu;
