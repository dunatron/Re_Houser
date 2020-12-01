import PropTypes from 'prop-types';
import React from 'react';
import { useCallback, useEffect } from 'react';
import { useQuery, useMutation, useApolloClient } from '@apollo/client';
import styled from 'styled-components';
import Error from '@/Components/ErrorMessage';
import Loader from '@/Components/Loader';
import { writeMessage } from '../../services/cache.service';
import { CHAT_QUERY, MESSAGES_CONNECTION_QUERY } from '@/Gql/queries/index';
import { CREATE_MESSAGE_MUTATION } from '@/Gql/mutations/index';
import { uuid } from 'uuidv4';
import {
  MESSAGES_CONNECTION_ORDER_BY,
  MESSAGES_CONNECTION_FIRST,
  MESSAGES_CONNECTION_SKIP,
} from '@/Lib/const';

import RChat from '@/Components/RChat';

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
      const cacheMessageId = uuid();
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
        optimisticResponse: {
          __typename: 'Mutation',
          createMessage: {
            id: cacheMessageId,
            chat: chat,
            __typename: 'Message',
            content: content,
            createdAt: '2020-12-01T03:20:45.346Z',
            isMine: true,
            sender: {
              id: me.id,
              firstName: me.firstName,
              lastName: me.lastName,
              __typename: 'User',
            },
          },
        },
        update: (proxy, { data }) => {
          if (data && data.createMessage) {
            writeMessage(client, data.createMessage, cacheMessageId);
          }
        },
      });
    },
    [chat, chatId, client, data]
  );

  if (!chat) return null;
  if (loading) return 'Loaiding';
  if (error) return <Error error={error} />;
  const { messagesConnection } = data;
  const mappedMessages = messagesConnection.edges.map(edge => edge.node);

  return (
    <RChat
      messages={mappedMessages}
      me={me}
      onSendMessage={onSendMessage}
      chat={chat}
      handleFetchMore={handleFetchMore}
    />
  );
};

ChatRoomScreen.propTypes = {
  chat: PropTypes.any,
  chatId: PropTypes.any,
  me: PropTypes.shape({
    id: PropTypes.any,
  }).isRequired,
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
  if (loading) return <Loader loading={loading} text="Initializing chat" />;
  if (error) return <Error error={error} />;
  // ToDo create a pagination provider for this
  return <ChatRoomScreen {...props} chat={data.chat} />;
};

ChatRoomScreenConnection.propTypes = {
  chatId: PropTypes.any,
};

export default ChatRoomScreenConnection;
