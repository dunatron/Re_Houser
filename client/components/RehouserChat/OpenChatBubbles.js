import PropTypes from 'prop-types';
import { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Paper, IconButton } from '@material-ui/core';
import NewChatButton from './NewChatButton';
import { store } from '@/Store/index';
import CloseIcon from '@material-ui/icons/Close';
import { getChatImageUrl } from '@/Lib/getChatImage';

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
    <div className={classes.root}>
      {chats &&
        chats
          .filter(
            (cht, idx) =>
              cht.id !== (state.activeChat ? state.activeChat.id : null)
          )
          .map((c, i) => {
            return (
              <div
                key={c.id}
                style={{
                  position: 'relative',
                }}>
                <IconButton
                  style={{
                    position: 'absolute',
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

OpenChatBubbles.propTypes = {
  chats: PropTypes.arrayOf(PropTypes.object),
  me: PropTypes.any.isRequired,
};
export default OpenChatBubbles;
