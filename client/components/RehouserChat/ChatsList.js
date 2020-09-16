import PropTypes from 'prop-types';
import { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Paper, Avatar } from '@material-ui/core';
import { getChatName } from '@/Lib/getChatName';
import { store } from '@/Store/index';
import moment from 'moment';
import Loader from '@/Components/Loader';
import Error from '@/Components/ErrorMessage';

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
  if (loading) return <Loader loading={loading} text={'Loading chats'} />;
  if (error) return <Error error={error} />;
  return data.chats.map((chat, i) => {
    return (
      <div
        key={chat.id}
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

ChatsList.propTypes = {
  me: PropTypes.shape({
    id: PropTypes.any
  }).isRequired
};

export default ChatsList;
