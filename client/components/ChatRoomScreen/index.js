import gql from 'graphql-tag';
import React from 'react';
import { useCallback, useEffect } from 'react';
import {
  useQuery,
  useMutation,
  useApolloClient,
  useSubscription,
} from '@apollo/client';
import styled from 'styled-components';
import ChatNavbar from './ChatNavBar';
import MessageInput from './MessageInput';
import MessagesList from './MessagesList';
import Error from '../ErrorMessage';
import { writeMessage } from '../../services/cache.service';
import {
  CHAT_QUERY,
  MESSAGES_QUERY,
  MESSAGES_CONNECTION_QUERY,
} from '../../graphql/queries/index';
import { CREATE_MESSAGE_MUTATION } from '../../graphql/mutations/index';
import {
  MESSAGES_CONNECTION_ORDER_BY,
  MESSAGES_CONNECTION_FIRST,
  MESSAGES_CONNECTION_SKIP,
} from '../../lib/const';

const Container = styled.div`
  background: url(/assets/chat-background.jpg);
  display: flex;
  // border-top: 1px solid red;
  border-top: ${props => `1px solid ${props.theme.palette.primary.main}`};
  // width: 280px;
  max-height: 300px;
  flex-flow: column;
  /* height: 100vh; */
  /* position: absolute;
  top: 0; */
`;

const ChatRoomScreen = ({ me, chat, chatId }) => {
  const client = useApolloClient();

  const { data, loading, error, fetchMore } = useQuery(
    MESSAGES_CONNECTION_QUERY,
    {
      variables: {
        orderBy: MESSAGES_CONNECTION_ORDER_BY,
        first: MESSAGES_CONNECTION_FIRST,
        skip: MESSAGES_CONNECTION_SKIP,
        where: {
          chat: {
            id: chatId,
          },
        },
      },
    }
  );

  const handleFetchMore = () => {
    if (!data.messagesConnection) return null;
    fetchMore({
      variables: {
        query: MESSAGES_CONNECTION_QUERY,
        cursor: data.messagesConnection.pageInfo.endCursor,
        skip: data.messagesConnection.edges.length,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult.messagesConnection.edges;
        const pageInfo = fetchMoreResult.messagesConnection.pageInfo;
        return newEdges.length
          ? {
              messagesConnection: {
                __typename: prevResult.messagesConnection.__typename,
                edges: [...newEdges, ...prevResult.messagesConnection.edges],
                pageInfo,
              },
            }
          : prevResult;
      },
    });
  };

  const handleOnScroll = () => {};
  const [createMessage, sendMessageProps] = useMutation(
    CREATE_MESSAGE_MUTATION
  );

  useEffect(() => {}, [chat, chatId, client, data]);

  const onSendMessage = useCallback(
    content => {
      if (!chat) return null;
      if (!data) return null;
      if (!data.messagesConnection) return null;
      createMessage({
        variables: {
          data: {
            content: content,
            isMine: true,
            lastMessageRel: {
              connect: {
                id: chatId,
              },
            },
            chat: {
              connect: {
                id: chatId,
              },
            },
            sender: {
              connect: {
                id: me.id,
              },
            },
          },
        },
        // optimisticResponse: {
        //   __typename: 'Mutation',
        //   updateComment: {
        //     id: commentId,
        //     __typename: 'Comment',
        //     content: commentContent,
        //   },
        // },
        update: (proxy, { data }) => {
          if (data && data.createMessage) {
            // writeMessage(client, data.createMessage);
            writeMessage(client, data.createMessage);
          }
        },
      });
      // const message = {
      //   cursor: (data.messagesConnection.edges.length + 10).toString(),
      //   node: {
      //     chat: {
      //       id: chatId,
      //       __typename: 'Chat',
      //     },
      //     id: (data.messagesConnection.edges.length + 10).toString(),
      //     createdAt: new Date(),
      //     content: content,
      //     isMine: true,
      //     __typename: 'Message',
      //   },
      //   __typename: 'MessageEdge',
      // };

      // // Perhaps just use the cache service writeMessage...
      // client.writeQuery({
      //   query: MESSAGES_CONNECTION_QUERY,
      //   variables: {
      //     orderBy: MESSAGES_CONNECTION_ORDER_BY,
      //     first: MESSAGES_CONNECTION_FIRST,
      //     skip: MESSAGES_CONNECTION_SKIP,
      //     where: {
      //       chat: {
      //         id: chatId,
      //       },
      //     },
      //   },
      //   data: {
      //     messagesConnection: {
      //       ...data.messagesConnection,
      //       edges: data.messagesConnection.edges.concat(message),
      //       // edges: [],
      //     },
      //   },
      // });
    },
    [chat, chatId, client, data]
  );

  if (!chat) return null;
  if (loading) return 'Loaiding';
  if (error) return <Error error={error} />;
  const { messagesConnection } = data;
  const mappedMessages = messagesConnection.edges.map(edge => edge.node);
  return (
    <Container>
      {/* <ChatNavbar chat={chat} />
      <button onClick={() => handleFetchMore()}>Fetch Older Messages</button> */}
      {messagesConnection.edges && (
        <MessagesList messages={mappedMessages} me={me} />
      )}

      <MessageInput onSendMessage={onSendMessage} />
    </Container>
  );
};

const ChatRoomScreenConnection = props => {
  const { chatId } = props;
  const { data, loading, error } = useQuery(CHAT_QUERY, {
    variables: {
      where: {
        id: chatId,
      },
    },
  });
  if (loading) return 'Loading';
  if (error) return <Error error={error} />;
  // ToDo create a pagination provider for this
  return <ChatRoomScreen {...props} chat={data.chat} />;
};

export default ChatRoomScreenConnection;
