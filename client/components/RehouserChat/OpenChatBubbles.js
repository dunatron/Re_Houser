import { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Paper, IconButton } from '@material-ui/core';
import NewChatButton from './NewChatButton';
import { store } from '../../store';
import CloseIcon from '@material-ui/icons/Close';
import { getChatImageUrl } from '../../lib/getChatImage';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    pointerEvents: 'auto', // re-enable pointer events
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));
const OpenChatBubbles = ({ chats, me }) => {
  const { state, dispatch } = useContext(store);
  const classes = useStyles();
  return (
    <div className={classes.root} square>
      {chats &&
        chats
          .filter(
            (cht, idx) =>
              cht.id !== (state.activeChat ? state.activeChat.id : null)
          )
          .map((c, i) => {
            return (
              <div
                style={{
                  position: 'relative',
                }}>
                <IconButton
                  style={{
                    position: 'absolute',
                    // top: '-8px',
                    // right: '-4px',
                    top: '-20px',
                    right: '-8px',
                    zIndex: '99',
                  }}
                  size="small"
                  onClick={() =>
                    dispatch({
                      type: 'closeChat',
                      payload: c.id,
                    })
                  }>
                  <CloseIcon fontSize="small" />
                </IconButton>

                <Avatar
                  alt="Rehouser Chat"
                  // src="/static/images/avatar/1.jpg"
                  src={getChatImageUrl(c, me)}
                  onClick={() =>
                    dispatch({
                      type: 'setActiveChat',
                      payload: c,
                    })
                  }
                />
              </div>
            );
          })}
      <NewChatButton me={me} />
    </div>
  );
};
export default OpenChatBubbles;
