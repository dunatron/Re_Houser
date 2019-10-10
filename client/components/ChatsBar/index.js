import React, {useEffect} from 'react';
import Router from 'next/router'
import { useQuery } from "@apollo/react-hooks";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ChatRoomScreen from '../ChatRoomScreen'
import gql from "graphql-tag";

const GET_OPEN_CHATS = gql`
  {
    openChats @client {
      id
      name
      __typename
    }
  }
`;

const useStyles = makeStyles(theme => ({
  root: {
    // flexGrow: 1,
    padding: theme.spacing(3),
    maxWidth: '100%',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      maxWidth: `calc(100% - ${theme.sideBarWidth}px)`,
    },
    position: "fixed",
    bottom: 0,
    left: '240px',
    background: 'aquamarine'
  },
}));

const FAKE_CHATS = [
  {
    id: 'asd', 
    name: 'Heath Dunlop'
  }
]

/**
 * I should use Apollo local state.
 * I will simply hold any open chats.
 */
const ChatsBar = () => {
  const classes = useStyles();
  const { data: openChats } = useQuery(GET_OPEN_CHATS)
  console.log("OUR OPEN CHATS => ", openChats)
  const doShow = () => {
    if(Router.route === '/chat') {
      return false
    }
    if(openChats.openChats.length === 0) return false
    return true
  }

  useEffect(() => {
    if(doShow()) {
      document.getElementById('main-content').style.paddingBottom = "100px";
    }
    return () => {
      document.getElementById('main-content').style.paddingBottom = "16px";
    }
  }, [Router.route, openChats.openChats])

  if(!doShow()) {
    return null
  }

  return (
    <div className={classes.root}>
      {openChats.openChats.map((c, i) => {
        return <div>{c.name} X
        
        {/* <ChatRoomScreen chatId={c.id} /> */}
        </div>
      })}
    </div>
  );
};

export default ChatsBar;
