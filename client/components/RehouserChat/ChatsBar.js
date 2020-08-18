import React, { useEffect, useState, useContext } from 'react';
import Router from 'next/router';
import { useQuery, useMutation } from '@apollo/client';
import { IconButton, Avatar } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ChatRoomScreen from '../ChatRoomScreen';
import gql from 'graphql-tag';
import { useCurrentUser } from '../User';
import { getChatName } from '../../lib/getChatName';
import { getChatImage } from '../../lib/getChatImage';
// icons
import CloseIcon from '../../styles/icons/CloseIcon';
import RemoveIcon from '@material-ui/icons/Remove';

import SuperLogin from '../../components/SuperLogin';
import { store } from '../../store';

import ChatRoom from './ChatRoom';
import OpenChatBubbles from './OpenChatBubbles';
import ChatsListSelector from './ChatsListSelector';
import ActiveChat from './ActiveChat';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '100%',
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    [theme.breakpoints.up('md')]: {
      maxWidth: `calc(100% - ${theme.sideBarWidth}px)`,
      left: `${theme.sideBarWidth}px`,
    },
    position: 'fixed',
    display: 'flex',
    bottom: 0,

    pointerEvents: 'none', // allows click through to elements behind
    background: 'transparent',
  },
}));

const ChatsBar = ({ me }) => {
  const classes = useStyles();
  const { state, dispatch } = useContext(store);

  const doShow = () => {
    return true;
    if (Router.route === '/chat') {
      return false;
    }
    if (openChats.openChats.length === 0) return false;
    return true;
  };

  useEffect(() => {
    if (doShow()) {
      document.getElementById('main-content').style.paddingBottom = '140px';
    }
    return () => {
      document.getElementById('main-content').style.paddingBottom = '16px';
    };
  }, [Router.route]);

  if (!doShow()) {
    return null;
  }

  //   console.log('Well what is the state => ', globalStore);

  return (
    <div className={classes.root}>
      {/* {state.openChats &&
        state.openChats.map((c, i) => {
          return <ChatBarItem chat={c} id={c.id} me={me} />;
        })} */}
      {state.activeChat && (
        <ActiveChat chat={state.activeChat} id={state.activeChat.id} me={me} />
      )}
      {state.chatsListOpen && <ChatsListSelector me={me} />}
      <OpenChatBubbles chats={state.openChats} me={me} />
    </div>
  );
};

export default ChatsBar;
