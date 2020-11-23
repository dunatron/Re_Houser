import PropTypes from 'prop-types';
import React, { useState, useContext } from 'react';
import { IconButton, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getChatName } from '@/Lib/getChatName';
import { getChatImage } from '@/Lib/getChatImage';
// icons
import CloseIcon from '@/Styles/icons/CloseIcon';
import RemoveIcon from '@material-ui/icons/Remove';
import { store } from '@/Store/index';
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
    background: theme.palette.background.paper,
    pointerEvents: 'auto', // re-enable pointer events
    width: '280px',
    marginRight: '8px',
  },
  barItemIn: {
    maxHeight: 'calc(100vh - 64px)',
    borderBottomLeftRadius: '0',
    borderBottomRightRadius: '0',
  },
  barItemHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: theme.spacing(1),
  },
  barItemTitle: {
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
  },
  actions: {
    display: 'flex',
  },
  chatName: {
    marginLeft: '6px',
    maxHeight: '64px',
    margin: '0 0 0 8px',
    overflow: 'auto',
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
      <div className={classes.barItemHeader}>
        <div className={classes.barItemTitle}>
          {getChatImage(chat, me)}
          <div className={classes.chatName}>{getChatName(chat, me)}</div>
        </div>
        <div className={classes.actions}>
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
};

ActiveChat.propTypes = {
  chat: PropTypes.shape({
    id: PropTypes.any,
  }).isRequired,
  id: PropTypes.any,
  me: PropTypes.any,
};
export default ActiveChat;
