import { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Paper, Avatar } from '@material-ui/core';
import { getChatName } from '../../lib/getChatName';
import { store } from '../../store';
import moment from 'moment';

export const MY_CHATS_QUERY = gql`
  query MY_CHATS_QUERY(
    $where: ChatWhereInput
    $orderBy: ChatOrderByInput
    $skip: Int
    $after: String
    $before: String
    $first: Int
    $last: Int
  ) {
    chats(
      where: $where
      orderBy: $orderBy
      skip: $skip
      after: $after
      before: $before
      first: $first
      last: $last
    ) {
      id
      name
      type
      lastMessage {
        id
        isMine
      }
      participants {
        id
        firstName
        lastName
        profilePhoto {
          url
        }
      }
    }
  }
`;

// id: "ckdzgaxzb6ud50999ndzjjg15"
// lastMessage: null
// name: "CHat room 0"
// participants: Array(2)
// 0:
// firstName: "Ben"
// id: "ckdzdhm5h6fe90999vbn2tutq"
// lastName: "Tester"
// __typename: "User"
// __proto__: Object
// 1: {__typename: "User", id: "ckdzdhm5vnpte0975dw0lomjk", firstName: "Heath R", lastName: "Dunlop"}
// length: 2
// __proto__: Array(0)
// type: "PEER"
// __typename: "Chat"

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const ChatsList = ({ me }) => {
  const { state, dispatch } = useContext(store);
  const classes = useStyles();
  const { data, loading, error } = useQuery(MY_CHATS_QUERY, {
    variables: {
      where: {
        participants_some: {
          id_in: me.id,
        },
      },
    },
  });
  console.log('CHats for this User => ', data);
  if (loading) return <div>Loading chats</div>;
  if (error) return <div>Error</div>;
  return data.chats.map((chat, i) => {
    return (
      <div
        className={classes.root}
        onClick={() =>
          dispatch({
            type: 'openChat',
            payload: chat,
          })
        }>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <div
          style={{
            marginLeft: '6px',
          }}>
          {getChatName(chat, me)}
        </div>
        {chat.lastMessage && (
          <>
            {chat.lastMessage.content}
            {moment(chat.lastMessage.createdAt).format('HH:mm')}
          </>
        )}
      </div>
    );
  });
};

export default ChatsList;
