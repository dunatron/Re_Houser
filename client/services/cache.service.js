import {
  CHAT_QUERY,
  MESSAGES_QUERY,
  MESSAGES_CONNECTION_QUERY,
} from '../graphql/queries/index';

import {
  MESSAGES_CONNECTION_ORDER_BY,
  MESSAGES_CONNECTION_FIRST,
  MESSAGES_CONNECTION_SKIP,
} from '../lib/const';

export const writeMessage = async (client, message, optimisticId) => {
  const isOptimisticMessage = optimisticId === message.id ? true : false;

  if (!client.query) {
    return;
  }

  // message connection variables
  const variables = {
    orderBy: MESSAGES_CONNECTION_ORDER_BY,
    first: MESSAGES_CONNECTION_FIRST,
    skip: MESSAGES_CONNECTION_SKIP,
    where: {
      chat: {
        id: message.chat.id,
      },
    },
  };

  // message connection messages
  const { data, loading, error } = await client.query({
    query: MESSAGES_CONNECTION_QUERY,
    variables: variables,
  });

  // new message to write
  const pagedMesssage = {
    cursor: message.id,
    node: {
      ...message,
    },
    __typename: 'MessageEdge',
  };

  // filter out optimistic message
  const filteredMessages = data.messagesConnection.edges.filter((edge, idx) => {
    if (edge.cursor === optimisticId && isOptimisticMessage) return;
    return edge;
  });

  // write the query to the cache
  client.writeQuery({
    query: MESSAGES_CONNECTION_QUERY,
    variables: variables,
    data: {
      messagesConnection: {
        ...data.messagesConnection,
        edges: [pagedMesssage, ...filteredMessages],
      },
    },
  });
};

export const writeChat = (client, chat) => {};
