import { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';
import Modal from '../Modal';
import ChatIcon from '@material-ui/icons/Chat';
import { green, pink } from '@material-ui/core/colors';
import ChatsListScreen from '../ChatsListScreen';
import { store } from '../../store';

const useStyles = makeStyles(theme => ({
  root: {
    // color: theme.palette.getContrastText(green[500]),
    // backgroundColor: green[500],
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

const NewChatButton = ({ me }) => {
  const { state, dispatch } = useContext(store);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  return (
    <>
      <Avatar
        className={classes.root}
        onClick={() =>
          dispatch({
            type: 'openChatsList',
            payload: state.chatsListOpen ? false : true,
          })
        }>
        <ChatIcon />
      </Avatar>
      {/* <Modal open={open} close={() => setOpen(false)} disableBackdrop={true}>
        <ChatsListScreen me={me} />
      </Modal> */}
    </>
  );
};

export default NewChatButton;
