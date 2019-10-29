import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ChatRoomScreen from '../ChatRoomScreen';
import gql from 'graphql-tag';
import { useCurrentUser } from '../User';
// icons
import CloseIcon from '../../styles/icons/CloseIcon';

const GET_OPEN_CHATS = gql`
  {
    openChats @client {
      id
      name
      __typename
    }
  }
`;

const OPEN_CHAT_LOCAL_MUTATION = gql`
  mutation OPEN_CHAT_LOCAL_MUTATION($id: Int!) {
    openChat(id: $id) @client
  }
`;

const CLOSE_CHAT_LOCAL_MUTATION = gql`
  mutation OPEN_CHAT_LOCAL_MUTATION($id: Int!) {
    closeChat(id: $id) @client
  }
`;

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '100%',
    width: '100%',
    alignItems: 'flex-end',
    [theme.breakpoints.up('sm')]: {
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
const ChatsBar = () => {
  // for whatever reason i have put it here. so just do a useQuery to get currentUser
  //
  const { loading, error, data } = useCurrentUser();
  if (loading) return null;
  if (error) return null;
  const { me } = data;
  if (!me) return null;
  console.log('ME IN CHAT BAR => ', data);
  const classes = useStyles();
  const { data: openChats } = useQuery(GET_OPEN_CHATS);
  const doShow = () => {
    if (Router.route === '/chat') {
      return false;
    }
    if (openChats.openChats.length === 0) return false;
    return true;
  };

  useEffect(() => {
    if (doShow()) {
      document.getElementById('main-content').style.paddingBottom = '100px';
    }
    return () => {
      document.getElementById('main-content').style.paddingBottom = '16px';
    };
  }, [Router.route, openChats.openChats]);

  if (!doShow()) {
    return null;
  }

  return (
    <div className={classes.root}>
      {openChats.openChats.map((c, i) => {
        return <ChatBarItem id={c.id} me={me} />;
      })}
    </div>
  );
};

const ChatBarItem = ({ id, me }) => {
  const classes = useStyles();
  const [contentIn, setContentIn] = useState(false);
  const [closeChat] = useMutation(CLOSE_CHAT_LOCAL_MUTATION, {
    variables: {
      id: id,
    },
  });
  return (
    <div className={`${classes.barItem} ${contentIn ? classes.barItemIn : ''}`}>
      <div
        className={classes.barItemHeader}
        onClick={() => {
          console.log('Back into the game');
          setContentIn(!contentIn);
        }}>
        <div className={classes.barItemTitle}>Title</div>
        <div
          className={classes.close}
          onClick={e => {
            e.preventDefault();
            closeChat();
          }}>
          <CloseIcon />
        </div>
      </div>
      {contentIn && (
        <div>
          <ChatRoomScreen chatId={id} me={me} />
        </div>
      )}
    </div>
  );
  return;
};

export default ChatsBar;
