import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';
import Modal from '@/Components/Modal';
import ChatIcon from '@material-ui/icons/Chat';
import { green, pink } from '@material-ui/core/colors';
import ChatsListScreen from '@/Components/ChatsListScreen';
import { store } from '@/Store/index';

const useStyles = makeStyles(theme => ({
  root: {
    color: '#fff',
    backgroundColor: theme.palette.primary.main,
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
    </>
  );
};

NewChatButton.propTypes = {
  me: PropTypes.any.isRequired,
};

export default NewChatButton;
