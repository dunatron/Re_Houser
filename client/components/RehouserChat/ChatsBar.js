import React, { useEffect, useState, useContext } from 'react';
import Router from 'next/router';
import { useQuery, useMutation } from '@apollo/client';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ChatRoomScreen from '../ChatRoomScreen';
import gql from 'graphql-tag';
import { useCurrentUser } from '../User';
import { getChatName } from '../../lib/getChatName';
import { getChatImage } from '../../lib/getChatImage';
// icons
import CloseIcon from '../../styles/icons/CloseIcon';

import SuperLogin from '../../components/SuperLogin';
import { store } from '../../store';

import ChatRoom from "./ChatRoom"

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '100%',
    width: '100%',
    alignItems: 'flex-end',
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
  barItem: {
    background: '#fff',
    pointerEvents: 'auto', // re-enable pointer events
    width: '280px',
    borderTop: `1px solid ${theme.palette.primary.main}`,
    borderRight: `1px solid ${theme.palette.primary.main}`,
    borderLeft: `1px solid ${theme.palette.primary.main}`,
  },
  barItemIn: {
    height: '300px',
  },
  barItemHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: ' space-between',
  },
  barItemTitle: {
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
  },
  close: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid yellow',
  },
}));

/**
 * I should use Apollo local state.
 * I will simply hold any open chats.
 */
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
      {state.openChats &&
        state.openChats.map((c, i) => {
          return <ChatBarItem chat={c} id={c.id} me={me} />;
        })}
    </div>
  );
};

const ChatBarItem = ({ id, chat, me }) => {
  const { state, dispatch } = useContext(store);
  const classes = useStyles();
  const [contentIn, setContentIn] = useState(false);
  return (
    <div className={`${classes.barItem} ${contentIn ? classes.barItemIn : ''}`}>
      <div
        className={classes.barItemHeader}
        onClick={() => setContentIn(!contentIn)}>
        <div className={classes.barItemTitle}>
          {getChatImage(chat, me)}
          {getChatName(chat, me)}
        </div>
        <div
          className={classes.close}
          onClick={e => {
            e.preventDefault();
            dispatch({
              type: 'closeChat',
            });
          }}>
          <CloseIcon />
        </div>
      </div>
      {contentIn && (
        <div>
          <ChatRoom chatId={id} me={me} />
        </div>
      )}
    </div>
  );
  return;
};

export default ChatsBar;
