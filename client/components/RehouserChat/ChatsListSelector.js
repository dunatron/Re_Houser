import PropTypes from "prop-types";
import { useState, useContext } from 'react';
import ChatsListScreen from '../ChatsListScreen';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Paper, IconButton, Card, CardHeader } from '@material-ui/core';
import FriendManager from '../FriendManager';
import ChatIcon from '@material-ui/icons/Chat';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import CloseIcon from '@material-ui/icons/Close';
import { store } from '../../store';
import ChatsList from './ChatsList';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '380px',
    minWidth: '150px',
    pointerEvents: 'auto', // re-enable pointer events
    // maxHeight: '100vh',
    maxHeight: 'calc(100vh - 64px)',
    overflow: 'auto',
    borderBottomLeftRadius: '0',
    borderBottomRightRadius: '0',
    '& > *': {
      margin: theme.spacing(1),
    },
    backgroundColor: theme.palette.background.paper,
  },
}));
const ChatsListSelector = ({ me }) => {
  const { state, dispatch } = useContext(store);
  const classes = useStyles();
  const [componentType, setComponentType] = useState('chats');
  return (
    <Paper className={classes.root} elevation={5}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}>
        <div>
          <IconButton
            aria-label="delete"
            color={componentType === 'chats' ? 'secondary' : 'default'}
            className={classes.margin}
            size="large"
            onClick={() => setComponentType('chats')}>
            <ChatIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            color={componentType === 'friends' ? 'secondary' : 'default'}
            aria-label="delete"
            className={classes.margin}
            size="large"
            onClick={() => setComponentType('friends')}>
            <GroupAddIcon fontSize="inherit" />
          </IconButton>
        </div>
        <IconButton
          aria-label="delete"
          className={classes.margin}
          size="large"
          onClick={() =>
            dispatch({
              type: 'openChatsList',
              payload: false,
            })
          }>
          <CloseIcon fontSize="inherit" />
        </IconButton>
      </div>
      {componentType === 'chats' && <ChatsList me={me} />}
      {componentType === 'friends' && <FriendManager />}
    </Paper>
  );
};

ChatsListSelector.propTypes = {
  me: PropTypes.any.isRequired
}

export default ChatsListSelector;
