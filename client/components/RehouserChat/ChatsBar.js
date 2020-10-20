import PropTypes from 'prop-types';
import React, { useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { store } from '@/Store/index';

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

  return (
    <div className={classes.root}>
      {state.activeChat && (
        <ActiveChat chat={state.activeChat} id={state.activeChat.id} me={me} />
      )}
      {state.chatsListOpen && <ChatsListSelector me={me} />}
      <OpenChatBubbles chats={state.openChats} me={me} />
    </div>
  );
};

ChatsBar.propTypes = {
  me: PropTypes.any
};

export default ChatsBar;
