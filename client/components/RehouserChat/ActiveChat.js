import React, { useEffect, useState, useContext } from 'react';
import Router from 'next/router';
import { useQuery, useMutation } from '@apollo/client';
import { IconButton, Avatar, Paper } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { getChatName } from '../../lib/getChatName';
import { getChatImage } from '../../lib/getChatImage';
// icons
import CloseIcon from '../../styles/icons/CloseIcon';
import RemoveIcon from '@material-ui/icons/Remove';

import { store } from '../../store';

import ChatRoom from './ChatRoom';

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
  barItem: {
    background: '#fff',
    pointerEvents: 'auto', // re-enable pointer events
    width: '280px',
    marginRight: '8px',

    // borderTop: `1px solid ${theme.palette.primary.main}`,
    // borderRight: `1px solid ${theme.palette.primary.main}`,
    // borderLeft: `1px solid ${theme.palette.primary.main}`,
  },
  barItemIn: {
    // height: '5000px',
    height: '460px',
    maxHeight: 'calc(100vh - 64px)',
    borderBottomLeftRadius: '0',
    borderBottomRightRadius: '0',
  },
  barItemHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(1),
  },
  barItemTitle: {
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
  },
  chatName: {
    marginLeft: '6px',
  },
  close: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid yellow',
  },
}));

const ActiveChat = ({ id, chat, me }) => {
  const { state, dispatch } = useContext(store);
  const classes = useStyles();
  const [contentIn, setContentIn] = useState(true);
  return (
    <Paper
      className={`${classes.barItem} ${contentIn ? classes.barItemIn : ''}`}
      elevation={5}>
      <div
        className={classes.barItemHeader}
        // onClick={() => setContentIn(!contentIn)}
      >
        <div className={classes.barItemTitle}>
          {/* <Avatar /> */}
          {getChatImage(chat, me)}
          <div className={classes.chatName}>{getChatName(chat, me)}</div>
        </div>
        <div>
          <IconButton
            size="small"
            onClick={e => {
              setContentIn(!contentIn);
              e.preventDefault();
              dispatch({
                type: 'setActiveChat',
                payload: null,
              });
            }}>
            <RemoveIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={e => {
              e.preventDefault();
              dispatch({
                type: 'closeChat',
                payload: chat.id,
              });
              dispatch({
                type: 'setActiveChat',
                payload: null,
              });
            }}>
            <CloseIcon />
          </IconButton>
        </div>
      </div>
      {contentIn && (
        <div>
          <ChatRoom chatId={id} me={me} />
        </div>
      )}
    </Paper>
  );
  return;
};
export default ActiveChat;
