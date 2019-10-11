import { DataProxy } from 'apollo-cache';
import { defaultDataIdFromObject } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';

import gql from 'graphql-tag';
import {
  useApolloClient,
  useQuery,
  useMutation,
  useSubscription,
} from '@apollo/react-hooks';

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

import * as fragments from '../graphql/fragments';
import * as queries from '../graphql/queries';

const OPEN_CHAT_LOCAL_MUTATION = gql`
  mutation OPEN_CHAT_LOCAL_MUTATION($id: Int!) {
    openChat(id: $id) @client
  }
`;

export const writeMessage = async (client, message) => {
  console.group('writeMessage cache service');
  console.log('message => ', message);
  console.log('client => ', client);

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
  const data = await client.query({
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

  // write the query to the cache
  client.writeQuery({
    query: MESSAGES_CONNECTION_QUERY,
    variables: variables,
    data: {
      messagesConnection: {
        ...data.messagesConnection,
        edges: data.messagesConnection.edges.concat(pagedMesssage),
      },
    },
  });
  console.log('chatsConn data => ', data);
  // cursor: data.messagesConnection.pageInfo.endCursor,
  // skip: data.messagesConnection.edges.length,
  // we will probably need to call the query and update a bunch of variables from where they are at.
  // so locating the current query in the cache and using that data...
  // const { data, loading, error } = useQuery(MESSAGES_CONNECTION_QUERY, {
  //   variables: {
  //     orderBy: MESSAGES_CONNECTION_ORDER_BY,
  //     first: MESSAGES_CONNECTION_FIRST,
  //     skip: MESSAGES_CONNECTION_SKIP,
  //     // where: {
  //     //   chat: {
  //     //     id: chatId,
  //     //   },
  //     // },
  //   },
  // });
  // console.log('messages connection data => ', data);
  // console.log('messages connection loading => ', loading);
  // console.log('messages connection error => ', error);

  // above we get the data for the chat. So we can essentially make sure our chats are up to date
  // i.e make sure the id is in our main chats query.

  // was it written by the current user? I think we catch this in the sub and if it was written by current user ignore it.
  // then in the actual input once it has been sent, do an optimistic response for write message. It could perhaps write twice to the cache ... =(

  // make sure the message is open in the chats bar
  console.groupEnd();
  // find the single chat query and update its messages.
  // actually maybe the chat has not been called yet...
  // that is ok we  will do the initial call here anyway...
  // make connections data a const
};

export const writeChat = (client, chat) => {};
